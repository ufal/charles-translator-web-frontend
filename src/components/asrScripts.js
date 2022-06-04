import { io } from "socket.io-client";

const Recorder = function(cfg){
	let config = cfg || {};
	let bufferLen = config.bufferLen || 16384;
	let numChannels = config.numChannels || 1;
	let bufferCallback = config.bufferCallback || function(buffer) { /*console.info(buffer);*/ };
	let errorCallback = config.errorCallback || function(error) { /*console.info(error);*/ };
	let volumeCallback = config.volumeCallback || function(average) { /*console.info(average);*/ };
	let sampleRate = 0;
	let recording = false;
	let source = null;
	let analyser = null;
	let sourceProcessor = null;
	let audio_context;
	let stream;

	this.init = function() {
		audio_context = createAudioContext();
		this.sampleRate = audio_context.sampleRate;

		if (typeof navigator.mediaDevices.getUserMedia === 'undefined') {
			navigator.getUserMedia({
				audio: true
			}, startUserMedia, errorCallback);
		} else {
			navigator.mediaDevices.getUserMedia({
				audio: true
			}).then(startUserMedia).catch(errorCallback);
		}
	}

	this.configure = function(cfg){
		for (let prop in cfg){
			if (cfg.hasOwnProperty(prop)){
				config[prop] = cfg[prop];
			}
		}
	}

	this.record = function(){
		recording = true;
	}

	this.stop = function(){
		recording = false;
		//stream.getTracks()[0].stop();
	}

	function createAudioContext() {
		try {
			window.AudioContext = window.AudioContext || window.webkitAudioContext || navigator.mozAudioContext;
			navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

			audio_context = new AudioContext;
			//console.info('Audio context set up.');
			//console.info('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));

			return audio_context;
		} catch (e) {
			errorCallback('No web audio support in this browser!');
		}
	}

	function startUserMedia(streamIn) {
		stream = streamIn;
		source = audio_context.createMediaStreamSource(stream);
		//console.info('Media stream created.');

		source.context.createScriptProcessor = source.context.createScriptProcessor || source.context.createJavaScriptNode;
		sourceProcessor = source.context.createScriptProcessor(bufferLen, numChannels, numChannels);

		analyser = source.context.createAnalyser();
		analyser.smoothingTimeConstant = 0.3;
		analyser.fftSize = 512;

		sourceProcessor.onaudioprocess = function(e){
			if (!recording) return;
			let buffer = [];
			for (let channel = 0; channel < numChannels; channel++){
					buffer.push(e.inputBuffer.getChannelData(channel));
			}

			bufferCallback(buffer);

			let values =  new Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(values);
			let average = getAverageVolume(values);
			console.log(average);
			volumeCallback(average);
		}

		source.connect(analyser);
		source.connect(sourceProcessor);
		analyser.connect(sourceProcessor);
		sourceProcessor.connect(source.context.destination);
		//console.info('Input connected to audio context destination.');
	}

	function getAverageVolume(array) {
		let sum = 0;
		let length = array.length;

		for (let i = 0; i < length; i++) {
			sum += array[i];
		}

		return sum / length;
	}
}


export const SpeechRecognition = function() {
	this.continuous = true;
	this.interimResults = true;
	this.onstart = function() {};
	this.onresult = function(event) {};
	this.onerror = function(event) {};
	this.onend = function() {};
	this.onchunk = function(chunk) {};
	this.volumeCallback = function(volume) {};
	this.isRecording = false;
	this.quietForChunks = 0;

	let recognizer = this;
	let recorder = null;
	let socket = createSocket();

	this.start = function(model) {
		if (!recorder)
			recorder = createRecorder();

		socket.emit('begin', {'model': model, 'sample_rate': recorder.sampleRate});
		recorder.record();
		this.isRecording = true;
		this.onstart();
	};

	this.stop = function() {
		socket.emit('end', {});
	
		if (recorder)
			recorder.stop();
		
	
		this.isRecording = false;
		this.onend();
	};

	this.changeLM = function(newLM) {
		console.info("change_lm");
		socket.emit('change_lm', {'new_lm': newLM});
	}

	let handleResult = function(results) {
		recognizer.onresult(results);
	};

	let handleError = function(error) {
		recognizer.onerror(error);
		recognizer.onend();
		recognizer.isRecording = false;
		recorder.stop();
	};

	let handleEnd = function() {
		recognizer.onend();
	};

	function createSocket() {
		let socket = io.connect('wss://lindat.cz/', {
			path: '/services/ukrasr/socket.io',
			transports : ['websocket'],
		});

		socket.on("connect", function() {
			//console.info("Socket connected");
		});

		socket.on("connect_failed", function() {
			handleError("Unable to connect to the server.");
		});

		socket.on("result", function(result) {
			handleResult(result);
		});

		socket.on("error", function(error) {
			handleError(error);
		});

		socket.on("server_error", function(error) {
			handleError(error.message);
		});

		socket.on("end", function(error) {
			handleEnd();
		});

		return socket;
	}

	function createRecorder() {
		recorder = new Recorder({
			bufferCallback: handleChunk,
			errorCallback: handleError,
			volumeCallback: handleVolume,
		});

		recorder.init();
		return recorder;
	}

	function handleChunk(chunk) {
		console.log("socket chunk", chunk);
		socket.emit("chunk", floatTo16BitPcm(chunk[0]));
		recognizer.onchunk(chunk);
	}

	function floatTo16BitPcm(input) {
		// convert float audio data to 16-bit PCM
		let buffer = new ArrayBuffer(input.length * 2)
		let output = new DataView(buffer);
		for (let i = 0, offset = 0; i < input.length; i++, offset += 2) {
			let s = Math.max(-1, Math.min(1, input[i]));
			output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
		}

		return buffer;
	}

	function handleVolume(volume) {
		if(volume == 0) {
			if(recognizer.quietForChunks >= 50) {
		this.stop();
			}

			recognizer.quietForChunks++;
		} else {
			recognizer.quietForChunks = 0;
		}

		recognizer.volumeCallback(volume);
	};
}
