import { Component } from '@angular/core';

@Component({
    selector: 'id-spinner',
    template: `
        <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
    `,
    styles: [`
        .spinner > div {
            width: 7px;
            height: 7px;
            background-color: #666;
            border-radius: 100%;
            display: inline-block;
            -webkit-animation: spinner-bouncedelay .75s infinite ease-in-out both;
            animation: spinner-bouncedelay .75s infinite ease-in-out both;
        }
        .spinner .bounce1 {
            -webkit-animation-delay: -0.2s;
            animation-delay: -0.2s;
        }
        .spinner .bounce2 {
            -webkit-animation-delay: -0.1s;
            animation-delay: -0.1s;
        }
        @-webkit-keyframes spinner-bouncedelay {
            0%, 80%, 100% { -webkit-transform: scale(0) }
            40% { -webkit-transform: scale(1.0) }
        }
        @keyframes spinner-bouncedelay {
            0%, 80%, 100% {
                -webkit-transform: scale(0);
                transform: scale(0);
            } 40% {
                -webkit-transform: scale(1.0);
                transform: scale(1.0);
            }
        }
    `]
})
export class SpinnerComponent { }