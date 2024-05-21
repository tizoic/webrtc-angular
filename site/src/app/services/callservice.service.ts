import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare var wsc: any;

@Injectable({
    providedIn: 'root'
})
export class CallService {
    wscObj: any;
    callObj!: any;
    callConfig!: any;
    gen: string | undefined;
    wsId: any;
    dstNumber: string | undefined;
    userToUser!: string;
    stateControls!: BehaviorSubject<string>
    shControls!: BehaviorSubject<boolean>

    constructor() {
        debugger
        this.stateControls = new BehaviorSubject<string>("");
        this.shControls = new BehaviorSubject<boolean>(true);
        this.wscObj = this.wscObj || {}
        this.wsId = "13256414800";
        this.userToUser = "13256414800";
        this.onSessionStateChange = this.onSessionStateChange.bind(this);

        this.startSession();

    }

    makeCall(): void {
        this.shControls.next(true);
        this.wscObj.callPackage.setTrickleIceMode('full');
        this.dstNumber = "20201089@172.16.19.122"
        this.callConfig = new wsc.CallConfig(wsc.MEDIADIRECTION.SENDRECV, wsc.MEDIADIRECTION.NONE);
        this.callObj = this.wscObj.callPackage.createCall(this.dstNumber, this.callConfig, this.onCallError);
        this.setupCallEvents();

        if (this.callObj) {
            this.callObj.start(null, { 'UserToUser': this.userToUser });
        }
    }

    end() {
        if (this.callObj) {
            this.callObj.end({ 'UserToUser': this.userToUser })
        }
    }

    onCallError(err: any) {
        console.log("Call Error" + err);
    }

    onSessionSuccess() {
        console.log(`Success. Gen: ${this.gen}. SessionId: ${this.wscObj.wscSession.getSessionId()}`);
    }

    //SESSION ERROR CALLBACK
    onSessionFailure(err: any) {
        console.log(err.reason);
    }

    generateRandomNumber(): string {
        // var x = Math.floor((Math.random() * 1000) + 1);
        return `123456@zup.com.br`;
    }

    onSessionStateChange(state: string) {
        console.log("Session changed");
        switch (state) {
            case wsc.SESSIONSTATE.CONNECTED:
                console.log("CONNECTED");
                this.makeCall();
                //$('#dstNumber').val("");
                this.stateControls.next("CONNECTED");
                break;
                break;
            case wsc.SESSIONSTATE.CLOSED:
                console.log("CLOSED! Please try again");
                this.stateControls.next("CLOSED");
                this.clearSessionStorage();
                break;
            case wsc.SESSIONSTATE.FAILED:
                console.log("FAILED! Please try again");
                this.stateControls.next("FAILED");
                this.clearSessionStorage();
                break;
        }
    }

    startSession() {
        this.userToUser = "13256414800";
        // this.dstNumber = "99532077";
        this.dstNumber = "20201089";
        this.gen = this.generateRandomNumber();
        this.wscObj.wscSession = new wsc.Session(this.gen, "wss://clicktocall.itau.com.br:7503/ws/webrtc/demo", this.onSessionSuccess, this.onSessionFailure);
        this.wscObj.wscSession.onSessionStateChange = this.onSessionStateChange;
        var authHandler = new wsc.AuthHandler(this.wscObj.wscSession);
        authHandler.refresh = this.challengeHandler;
        this.wscObj.callPackage = new wsc.CallPackage(this.wscObj.wscSession);
    }

    challengeHandler(authType: any, _authHeaders: any) {
        if (authType == wsc.AUTHTYPE.TURN) {
            return null;
        }
    }

    setupCallEvents() {
        console.log("On SetUp Call Events");
        this.callObj.onCallStateChange = this.onCallStateChange.bind(this);
        this.callObj.onMediaStreamEvent = this.onMediaStreamEvent.bind(this);
    }

    onCallStateChange(callState: any) {

        console.log('CALL STATE: ', callState.state)
        console.log('/////////////// ', this.shControls?.value)

        switch (callState.state) {
            case wsc.CALLSTATE.STARTED:
                console.log("CALL - STARTED");
                this.stateControls.next("STARTED");
                break;
            case wsc.CALLSTATE.ESTABLISHED:
                console.log("CALL - ESTABLISHED");
                this.stateControls.next("ESTABLISHED");
                this.shControls.next(false)
                break;
            case wsc.CALLSTATE.FAILED:
                console.log("CALL - FAILED");
                this.stateControls.next("FAILED");
                this.wscObj.wscSession.close();
                this.clearSessionStorage();
                break;
            case wsc.CALLSTATE.ENDED:
                console.log("CALL - ENDED");
                this.stateControls.next("ENDED");
                window.setTimeout(this.wscObj.wscSession.close(), 3e3);
                this.clearSessionStorage()
        }
    }

    onMediaStreamEvent(mediaStreamEvent: any, stream: any) {
        console.log("Stream : ".concat(JSON.stringify(stream)));
        console.log("MediaStreamEvent : ".concat(JSON.stringify(mediaStreamEvent)));
        let remoteAudio: any
        let rurl: any
        let audioTracks: any
        remoteAudio = document.getElementById("remoteAudio")

        if (stream.audioTracks) {
            console.log("Old version to get audiotracks and videotracks");
            rurl = URL.createObjectURL(stream);
            // Old version
            audioTracks = stream.audioTracks;
        } else {
            console.log("New version to get audiotracks and videotracks");
            // New version
            audioTracks = stream.getAudioTracks();
        }

        console.log("Audio Track " + JSON.stringify(audioTracks));

        if (mediaStreamEvent == wsc.MEDIASTREAMEVENT.REMOTE_STREAM_ADDED) {
            if (audioTracks.length > 0) {
                if ('srcObject' in remoteAudio) {
                    console.log("srcObject in remoteAudio");
                    remoteAudio.srcObject = stream;
                } else {
                    console.log("srcObject not in remoteAudio");
                    remoteAudio.src = rurl;
                }
                remoteAudio.play();
            }
        } else if (mediaStreamEvent == wsc.MEDIASTREAMEVENT.LOCAL_STREAM_ADDED) {
            if (audioTracks.length > 0) {
                console.log('mediaStreamEvent')
                this.callObj.callConfig.mediaStream = stream;
                // pageObj.mediaStream.localStream = stream;
            }
        } else if (mediaStreamEvent == wsc.MEDIASTREAMEVENT.REMOTE_STREAM_REMOVED) {
            if (audioTracks.length > 0) {
                remoteAudio.pause();
                remoteAudio.src = "";
            }
        }
    }

    clearSessionStorage(): void {
        console.log('clearSessionStorage')
    }
}
