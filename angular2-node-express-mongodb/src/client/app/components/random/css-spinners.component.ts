import { Component } from '@angular/core';

@Component({
    template: `
        <section>
            <h1 class="title">CSS Spinners</h1>

            <div class="column">
                <div class="spinner spinner1"></div>

                <div class="spinner spinner2">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                </div>

                <div class="spinner spinner3">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>

                <div class="spinner spinner4">
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                    <div class="circle3"></div>
                    <div class="circle4"></div>
                    <div class="circle5"></div>
                </div>

                <div class="spinner spinner5">
                    <div class="inner"></div>
                    <div class="outer"></div>
                </div>
            </div>

            <div class="column">
                <div class="spinner spinner6">
                    <div class="inner"></div>
                    <div class="outer"></div>
                </div>

                <div class="spinner spinner7">
                    <div class="inner"></div>
                    <div class="outer"></div>
                </div>

                <div class="spinner spinner8"></div>

                <div class="spinner spinner9"></div>

                <div class="spinner spinner10">
                    <div class="first"></div>
                    <div class="second"></div>
                    <div class="third"></div>
                    <div class="fourth"></div>
                </div>
            </div>
        </section>
    `,
    styles: [`
        .spinner {
            margin: 30px 0;
        }

        .column {
            display: inline-block;
            width: 20%;
            padding-left: 100px;
            vertical-align: top;
        }

        @keyframes spin360 {
            100% { transform: rotate(360deg); }
        }
        @keyframes spin360Rev {
            100% { transform: rotate(-360deg); }
        }
        @keyframes spin540 {
            100% { transform: rotate(540deg); }
        }
        @keyframes spin720AndColor {
            0% { transform: rotate(0deg); border-top: .2em solid #555; }
            50% { transform: rotate(360deg); border-top: .2em solid #a33; }
            100% { transform: rotate(720deg); border-top: .2em solid #555; }
        }
        @keyframes scale0to1to0 {
            0%, 100% { transform: scale(0); }
            50% { transform: scale(1); }
        }
        @keyframes scale1to0Delayed {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 0;
            }
            50% { opacity: 1; }
            100% {
                transform: scale(1);
                opacity: 0;
            }
        }

        .spinner1 {
            font-size: 10px;
            width: 2.5em;
            height: 2.5em;
            border-radius: 50%;
            border: .2em solid transparent;
            animation: spin720AndColor 2s infinite linear;
        }

        .spinner2 {
            width: 30px;
            height: 30px;
            position: relative;
        }
        .spinner2 .bounce1,
        .spinner2 .bounce2 {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #333;
            opacity: 0.5;
            position: absolute;
            top: 0;
            left: 0;
            animation: scale0to1to0 2.0s infinite ease-in-out;
        }
        .spinner2 .bounce2 {
            background-color: #933;
        }
        .spinner2 .bounce2 {
            animation-delay: -1.0s;
        }

        .spinner3 > div {
            width: 7px;
            height: 7px;
            border: 1px solid #666;
            border-radius: 100%;
            display: inline-block;
            animation: scale1to0Delayed 1.4s infinite ease-in-out both;
        }
        .spinner3 .bounce1 {
            animation-delay: -0.32s;
        }
        .spinner3 .bounce2 {
            animation-delay: -0.16s;
        }

        .spinner4 {
            width: 30px;
            height: 30px;
            position: relative;
            animation: spin360 1.2s infinite steps(12);
        }
        .spinner4 > div {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
        }
        .spinner4 > div:before {
            content: '';
            display: block;
            margin: 0 auto;
            width: 15%;
            height: 15%;
            background-color: #333;
            border-radius: 100%;
        }
        .spinner4 .circle1 {
            opacity: .1;
        }
        .spinner4 .circle2 {
            transform: rotate(30deg);
            opacity: .2;
        }
        .spinner4 .circle3 {
            transform: rotate(60deg);
            opacity: .3;
        }
        .spinner4 .circle4 {
            transform: rotate(90deg);
            opacity: .5
        }
        .spinner4 .circle5 {
            transform: rotate(120deg);
        }

        .spinner5 {
            width: 25px;
            height: 25px;
            position: relative;
        }
        .spinner5 .inner {
            width: 15px;
            height: 15px;
            position: absolute;
            top: 5;
            left: 5;
            border-radius: 50%;
            border: 2px solid rgba(150, 0, 0, .6);
        }
        .spinner5 .outer {
            width: 25px;
            height: 25px;
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 50%;
            border: 2px solid rgba(0, 0, 0, 0);
            border-left: 2px solid rgba(0, 0, 0, .6);
            border-right: 2px solid rgba(0, 0, 0, .6);
            animation: spin360 1s infinite linear;
        }

        .spinner6 {
            width: 24px;
            height: 24px;
            position: relative;
        }
        .spinner6 .inner {
            width: 16px;
            height: 16px;
            position: absolute;
            top: 4;
            left: 4;
            border-radius: 50%;
            border: 4px solid rgba(50, 50, 50, .8);
            border-left: 4px solid transparent;
            animation: spin360 1.2s infinite linear;
        }
        .spinner6 .outer {
            width: 24px;
            height: 24px;
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 50%;
            border: 4px solid rgba(200, 50, 50, .8);
            border-left: 4px solid transparent;
            animation: spin360 2s infinite linear;
        }

        .spinner7 {
            width: 24px;
            height: 24px;
            position: relative;
        }
        .spinner7 .inner {
            width: 12px;
            height: 12px;
            position: absolute;
            top: 6;
            left: 6;
            border-radius: 50%;
            border: 1px solid rgba(75, 75, 75, .8);
            border-left: 1px solid transparent;
            animation: spin360Rev 1.1s infinite linear;
        }
        .spinner7 .outer {
            width: 24px;
            height: 24px;
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 50%;
            border: 1px solid rgba(200, 50, 50, .8);
            border-left: 1px solid transparent;
            animation: spin360 2.5s infinite linear;
        }

        .spinner8 {
            width: 25px;
            height: 25px;
            border: 2px solid transparent;
            border-radius: 50%;
            position: relative;
            top: 50%;
        }
        .spinner8:before {
            content: '';
            border: 2px solid rgba(0, 0, 0, .6);
            border-radius: 50%;
            width: 25px;
            height: 25px;
            position: absolute;
            top: -4px;
            left: -4px;
            animation: ripple 1.5s ease-out infinite;
            opacity: 0;
        }
        .spinner8:after {
            content: '';
            border: 2px solid rgba(0, 0, 0, .6);
            border-radius: 50%;
            width: 25px;
            height: 25px;
            position: absolute;
            top: -4px;
            left: -4px;
            animation: ripple 1.5s ease-out infinite;
            animation-delay: 0.5s;
            opacity: 0;
        }

        .spinner9 {
            height: 24px;
            width: 24px;
            border: 2px solid rgba(230, 230, 230, 1);
            border-radius: 50%;
            position: relative;
            animation: spin540 2s infinite ease-in-out;
        }
        .spinner9:before,
        .spinner9:after {
            content: '';
            height: 4px;
            width: 4px;
            border-radius: 50%;
            background-color: rgba(150, 0, 0, 1);
        }
        .spinner9:before {
            position: absolute;
            top: -3px;
            left: 10px;
        }
        .spinner9:after {
            position: absolute;
            top: 23px;
            left: 10px;
        }

        .spinner10 {
            width: 24px;
            height: 24px;
            position: relative;
        }
        .spinner10 .first {
            width: 24px;
            height: 24px;
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 50%;
            border: 3px solid transparent;
            border-top: 3px solid #333;
            animation: spin10a 2s infinite cubic-bezier(.4,.1,.6,.9);
        }
        .spinner10 .second {
            width: 24px;
            height: 24px;
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 50%;
            border: 3px solid transparent;
            border-top: 3px solid #333;
            animation: spin10b 2s infinite cubic-bezier(.4,.1,.6,.9);
        }
        .spinner10 .third {
            width: 24px;
            height: 24px;
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 50%;
            border: 3px solid transparent;
            border-top: 3px solid #333;
            animation: spin10c 2s infinite cubic-bezier(.4,.1,.6,.9);
        }
        .spinner10 .fourth {
            width: 24px;
            height: 24px;
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 50%;
            border: 3px solid transparent;
            border-top: 3px solid #333;
            animation: spin10d 2s infinite cubic-bezier(.4,.1,.6,.9);
        }
        @keyframes spin10a {
            0% { transform: rotate(0deg); }
            40% { transform: rotate(360deg); }
            50% { border-top: 3px solid #d55; }
            60% { transform: rotate(720deg); }
            100% { transform: rotate(1440deg); border-top: 3px solid #333; }
        }
        @keyframes spin10b {
            0% { transform: rotate(0deg); }
            40% { transform: rotate(450deg); }
            50% { border-top: 3px solid #d55; }
            60% { transform: rotate(810deg); }
            100% { transform: rotate(1440deg); border-top: 3px solid #333; }
        }
        @keyframes spin10c {
            0% { transform: rotate(0deg); }
            40% { transform: rotate(540deg); }
            50% { border-top: 3px solid #d55; }
            60% { transform: rotate(900deg); }
            100% { transform: rotate(1440deg); border-top: 3px solid #333; }
        }
        @keyframes spin10d {
            0% { transform: rotate(0deg); }
            40% { transform: rotate(630deg); }
            50% { border-top: 3px solid #d55; }
            60% { transform: rotate(990deg); }
            100% { transform: rotate(1440deg); border-top: 3px solid #333; }
        }
    `]
})
export class CssSpinnersComponent { }