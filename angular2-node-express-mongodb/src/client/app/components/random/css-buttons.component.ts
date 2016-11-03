import { Component } from '@angular/core';

@Component({
    template: `
        <section>
            <h1 class="title">CSS Buttons & Links</h1>

            <div class="buttons">
                <h2>Buttons</h2>

                <button class="button1">Button 1</button>

                <button class="button2">Button 2</button>

                <button class="button3">Button 3</button>

                <button class="button4">Button 4</button>

                <button class="button5">
                    <div class="first">Button 5</div>
                    <div class="second">Button 5</div>
                </button>

                <button class="button6">
                    <div class="first">Button 6</div>
                    <div class="second">Button 6</div>
                </button>

                <button class="button7">
                    <div class="top"></div>
                    <div class="text">Button 7</div>
                    <div class="bottom"></div>
                </button>
            </div>

            <div class="links">
                <h2>Links</h2>

				<nav class="links1">
					<a href="javascript:;">Link 1</a>
					<a href="javascript:;">Link 2</a>
					<a href="javascript:;">Link 3</a>
				</nav>

				<nav class="links2">
					<a href="javascript:;">Link 1</a>
					<a href="javascript:;">Link 2</a>
					<a href="javascript:;">Link 3</a>
				</nav>

				<nav class="links3">
					<a href="javascript:;"><span data-hover="Link 1">Link 1</span></a>
					<a href="javascript:;"><span data-hover="Link 2">Link 2</span></a>
					<a href="javascript:;"><span data-hover="Link 3">Link 3</span></a>
				</nav>

				<nav class="links4">
					<a href="javascript:;">Link 1</a>
					<a href="javascript:;">Link 2</a>
					<a href="javascript:;">Link 3</a>
				</nav>

				<nav class="links5">
					<a href="javascript:;"><span>Link 1</span><span>desc 1</span></a>
					<a href="javascript:;"><span>Link 2</span><span>desc 2</span></a>
					<a href="javascript:;"><span>Link 3</span><span>desc 3</span></a>
				</nav>

				<nav class="links6">
					<a href="javascript:;">Link 1</a>
					<a href="javascript:;">Link 2</a>
					<a href="javascript:;">Link 3</a>
				</nav>

				<nav class="links7">
					<a href="javascript:;">Link 1</a>
					<a href="javascript:;">Link 2</a>
					<a href="javascript:;">Link 3</a>
				</nav>
            </div>
        </section>
    `,
    styles: [`
        h2 { margin-bottom: 30px; }
        .buttons {
            display: inline-block;
            width: 40%;
        }
        button {
            display: block;
            margin-bottom: 10px;
            height: 35px;
            width: 150px;
            background: rgba(255, 255, 255, .7);
            border: 1px solid #bbb;
        }

        .button1 {
            transform: perspective(1px) translateZ(0);
            transition-duration: 0.3s;
        }
        .button1:before {
            content: "";
            position: absolute;
            z-index: -1;
            top: 0;
            left: -1;
            right: -1;
            bottom: 0;
            background: rgba(150, 0, 0, .5);
            transform: scaleX(0);
            transform-origin: 0 50%;
            transition-duration: 0.3s;
            transition-timing-function: ease-out;
        }
        .button1:hover,
        .button1:focus,
        .button1:active {
            color: white;
        }
        .button1:hover:before,
        .button1:focus:before,
        .button1:active:before {
            transform: scaleX(1);
        }

        .button2 {
            transform: perspective(1px) translateZ(0);
        }
        .button2:before {
            content: "";
            position: absolute;
            z-index: -1;
            left: 50%;
            right: 50%;
            bottom: 0;
            background: rgba(150, 0, 0, .5);
            height: 4px;
            transition-property: left, right;
            transition-duration: 0.3s;
            transition-timing-function: ease-out;
        }
        .button2:hover:before,
        .button2:focus:before,
        .button2:active:before {
            left: 0;
            right: 0;
        }

        .button3 {
            transform: perspective(1px) translateZ(0);
            transition-duration: 0.3s;
        }
        .button3:hover,
        .button3:focus,
        .button3:active {
            box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
            transform: scale(1.1);
        }

        .button4 {
            transition: border 0.05s, font-weight 0.1s, font-size 0.1s, background-color 0.1s;
        }
        .button4:hover {
            border: 2px solid #888;
            font-weight: 700;
            font-size: 13px;
            background-color: rgba(240,210,210,0.7);
        }

        .button5 {
            transition: 0.3s;
            position: relative;
            overflow: hidden;
        }
        .button5 .first {
            transition: 0.3s;
            margin: 8px 0 15px;
        }
        .button5 .second {
            color: #333;
            font-weight: 700;
            transform: scale(1.2);
        }
        .button5:hover {
            background-color: rgba(240,210,210,0.7);
        }
        .button5:hover .first {
            margin-top: -27px;
        }

        .button6 {
            transition: 0.3s;
            position: relative;
            overflow: hidden;
        }
        .button6 .second,
        .button6 .first {
            transition: all 0.3s, opacity 0.1s;
            width: 100%;
            height: 100%;
            position: absolute;
            padding: 10px 0;
            top: 0;
            left: 0;
        }
        .button6 .second {
            left: -250px;
            color: #333;
            font-weight: 700;
            padding: 11px 0;
            transform: scale(1.2);
            background-color: rgba(240,210,210,0.7);
            border-right: 1px solid #bbb;
        }
        .button6:hover .first {
            margin-left: 250px;
            opacity: 0;
        }
        .button6:hover .second {
            margin-left: 250px;
        }

        .button7 {
            transition: all 0.3s, border 0.01s;
            position: relative;
        }
        .button7 .text {
            width: 100%;
            height: 100%;
            position: absolute;
            padding-top: 10px;
            top: 0;
            left: 0;
            transform: all 0.5s;
        }
        .button7 .top,
        .button7 .bottom {
            content: '';
            position: absolute;
            top: 33px;
            left: 50;
            width: 1%;
            height: 1px;
            background: #bbb;
            opacity: 0;
            transition: 0.5s;
        }
        .button7 .top {
            top: -1;
        }
        .button7:hover {
            letter-spacing: 2px;
            font-weight: 700;
            border-color: transparent;
            color: #833;
        }
        .button7:hover .text {
            transform: scale(1.2);
            padding-top: 11px;
        }
        .button7:hover .top,
        .button7:focus .top,
        .button7:hover .bottom,
        .button7:focus .bottom {
            opacity: 1;
            left: 0;
            width: 100%;
        }


        .links {
            display: inline-block;
            vertical-align: top;
        }
        .links nav { margin-bottom: 15px;
            text-align: center; }
        .links a {
            position: relative;
            display: inline-block;
            margin: 0 25px;
            outline: none;
            color: #833;
            text-decoration: none;
            font-weight: 400;
        }
        .links a:hover,
        .links a:focus {
            outline: none;
        }

        .links1 a {
            margin: 0 10px;
        }
        .links1 a::before,
        .links1 a::after {
            display: inline-block;
            opacity: 0;
            transition: transform 0.3s, opacity 0.2s;
        }
        .links1 a::before {
            margin-right: 10px;
            content: '[';
            color: #555 !important;
            transform: translateX(20px);
        }
        .links1 a::after {
            margin-left: 10px;
            content: ']';
            color: #555;
            transform: translateX(-20px);
        }
        .links1 a:hover::before,
        .links1 a:hover::after,
        .links1 a:focus::before,
        .links1 a:focus::after {
            opacity: 1;
            transform: translateX(0px);
        }

        .links2 a {
            padding: 8px 0;
        }
        .links2 a:after {
            position: absolute;
            top: 90%;
            left: 0;
            width: 100%;
            height: 2px;
            background: #aaa;
            content: '';
            opacity: 0;
            transition: opacity 0.3s, transform 0.3s;
            transform: translateY(10px);
        }
        .links2 a:hover::after,
        .links2 a:focus::after {
            opacity: 1;
            transform: translateY(0px);
        }

        .links3 a {
            overflow: hidden;
            height: 1em;
        }
        .links3 a span {
            position: relative;
            display: inline-block;
            transition: transform 0.3s;
        }
        .links3 a span::before {
            position: absolute;
            top: 100%;
            content: attr(data-hover);
            color: #333;
            font-weight: 700;
            transform: translate3d(0,0,0);
        }
        .links3 a:hover span,
        .links3 a:focus span {
            transform: translateY(-100%);
        }

        .links4 a {
            padding: 8px 5px;
            margin: 0 20px;
            transition: color 0.3s, font-weight 0.3s;
        }
        .links4 a::before,
        .links4 a::after {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            height: 1px;
            background: #833;
            content: '';
            transition: background 0.3s, transform 0.3s;
            transform: scale(0.8);
        }
        .links4 a::after {
            opacity: 0;
            transition: top 0.3s, opacity 0.3s, transform 0.3s;
        }
        .links4 a:hover::before,
        .links4 a:hover::after,
        .links4 a:focus::before,
        .links4 a:focus::after {
            background: #333;
            transform: scale(1);
        }
        .links4 a:hover,
        .links4 a:hover,
        .links4 a:focus,
        .links4 a:focus {
            color: #333;
            font-weight: 700;
        }
        .links4 a:hover::after,
        .links4 a:focus::after {
            top: 0%;
            opacity: 1;
        }

        .links5 a {
            margin: 10px 20px 0;
            padding: 10px 5px 5px;
        }
        .links5 a::after {
            content: '';
            position: absolute;
            top: 30px;
            left: 0;
            width: 100%;
            height: 1px;
            background: #888;
            opacity: 0;
            transition: transform 0.3s, opacity 0.3s, height 0.3s;
            transform: translateY(-10px);
        }
        .links5 a span:first-child {
            z-index: 2;
            display: block;
        }
        .links5 a span:last-child {
            z-index: 1;
            display: block;
            padding: 10px 0 0 0;
            color: #888;
            text-shadow: none;
            text-transform: none;
            font-style: italic;
            font-size: 0.75em;
            font-family: Palatino, Georgia, serif;
            opacity: 0;
            transition: transform 0.3s, opacity 0.3s;
            transform: translateY(-100%);
        }
        .links5 a:hover::after,
        .links5 a:focus::after {
            opacity: 1;
            transform: translateY(0px);
        }
        .links5 a:hover span:last-child,
        .links5 a:focus span:last-child {
            opacity: 1;
            transform: translateY(0%);
        }

        .links6 a {
            transition: color 0.3s, font-weight 0.3s;
        }
        .links6 a::before,
        .links6 a::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 35px;
            height: 35px;
            border: 1px solid rgba(100,0,0,0.15);
            border-radius: 50%;
            opacity: 0;
            transition: transform 0.3s, opacity 0.3s;
            transform: translateX(-50%) translateY(-50%) scale(0.2);
        }
        .links6 a::after {
            width: 25px;
            height: 25px;
            border: 3px solid rgba(100,0,0,0.1);
            transform: translateX(-50%) translateY(-50%) scale(0.5);
        }
        .links6 a:hover::before,
        .links6 a:hover::after,
        .links6 a:focus::before,
        .links6 a:focus::after {
            opacity: 1;
            transform: translateX(-50%) translateY(-50%) scale(1);
        }
        .links6 a:hover,
        .links6 a:hover,
        .links6 a:focus,
        .links6 a:focus {
            color: #333;
            font-weight: 700;
        }

        .links7 a {
            margin: 0 17px;
            padding: 8px;
            transition: color 0.3s, font-weight 0.3s;
        }
        .links7 a::before,
        .links7 a::after {
            position: absolute;
            left: 0;
            width: 100%;
            height: 1px;
            background: #555;
            content: '';
            opacity: 0;
            transition: opacity 0.3s, transform 0.3s;
            transform: translateY(-10px);
        }
        .links7 a::before {
            top: 0;
            transform: translateY(-10px);
        }
        .links7 a::after {
            bottom: 0;
            transform: translateY(10px);
        }
        .links7 a:hover,
        .links7 a:focus {
            color: #333;
            font-weight: 700;
        }
        .links7 a:hover::before,
        .links7 a:focus::before,
        .links7 a:hover::after,
        .links7 a:focus::after {
            opacity: 1;
            transform: translateY(0px);
        }
    `]
})
export class CssButtonsComponent { }