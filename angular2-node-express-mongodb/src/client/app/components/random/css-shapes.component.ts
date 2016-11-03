import { Component } from '@angular/core';

@Component({
    template: `
        <section>
            <h1 class="title">CSS Shapes</h1>

            <div class="square"></div>
            <div class="rectangle"></div>
            <div class="circle"></div>
            <div class="oval"></div>
            <div class="trapezoid"></div>
            <div class="parallelogram"></div>
            <div class="triangle"></div>
            <div class="triangle-angled"></div>
            <div class="pentagon"></div>
            <div class="hexagon"></div>
            <div class="octagon"></div>
            <div class="diamond"></div>
            <div class="flag"></div>
            <div class="egg"></div>
            <div class="pacman"></div>
            <div class="moon"></div>

        </section>
    `,
    styles: [`
        div {
            margin: 10px 0;
        }
        .square {
            width: 100px;
            height: 100px;
            background-color: red;
        }
        .rectangle {
            width: 200px;
            height: 100px;
            background-color: red;
        }
        .circle {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-color: red;
        }
        .oval {
            width: 200px;
            height: 100px;
            border-radius: 100px/50px;
            background-color: red;
        }
        .trapezoid {
            width: 100px;
            height: 0;
            border-left: 50px solid transparent;
            border-right: 50px solid transparent;
            border-bottom: 100px solid red;
        }
        .parallelogram {
            width: 150px;
            height: 100px;
            -webkit-transform: skew(20deg);
            -moz-transform: skew(20deg);
            -ms-transform: skew(20deg);
            -o-transform: skew(20deg);
            background: red;
        }
        .triangle {
            width: 0;
            height: 0;
            border-left: 50px solid transparent;
            border-right: 50px solid transparent;
            border-bottom: 100px solid red;
        }
        .triangle-angled {
            width: 0;
            height: 0;
            border-top: 100px solid red;
            border-left: 100px solid transparent;
        }

        .pentagon {
            margin-top: 45px;
            position: relative;
            width: 54px;
            border-width: 50px 18px 0;
            border-style: solid;
            border-color: red transparent;
        }
        .pentagon:before {
            content: "";
            position: absolute;
            height: 0;
            width: 0;
            top: -85px;
            left: -18px;
            border-width: 0 45px 35px;
            border-style: solid;
            border-color: transparent transparent red;
        }

        .hexagon {
            margin-top: 35px;
            width: 100px;
            height: 55px;
            background: red;
            position: relative;
        }
        .hexagon:before {
            content: "";
            position: absolute;
            top: -25px;
            left: 0;
            width: 0;
            height: 0;
            border-left: 50px solid transparent;
            border-right: 50px solid transparent;
            border-bottom: 25px solid red;
        }
        .hexagon:after {
            content: "";
            position: absolute;
            bottom: -25px;
            left: 0;
            width: 0;
            height: 0;
            border-left: 50px solid transparent;
            border-right: 50px solid transparent;
            border-top: 25px solid red;
        }

        .octagon {
            margin-top: 35px;
            width: 100px;
            height: 100px;
            background: red;
            position: relative;
        }
        .octagon:before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            border-bottom: 29px solid red;
            border-left: 29px solid white;
            border-right: 29px solid white;
            width: 42px;
            height: 0;
        }
        .octagon:after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            border-top: 29px solid red;
            border-left: 29px solid white;
            border-right: 29px solid white;
            width: 42px;
            height: 0;
        }

        .diamond {
            width: 0;
            height: 0;
            border: 50px solid transparent;
            border-bottom: 70px solid red;
            position: relative;
            top: -50px;
        }
        .diamond:after {
            content: '';
            position: absolute;
            left: -50px; top: 70px;
            width: 0;
            height: 0;
            border: 50px solid transparent;
            border-top: 70px solid red;
        }

        .flag {
            margin-top: 35px;
            width: 110px;
            height: 56px;
            padding-top: 15px;
            position: relative;
            background: red;
            color: white;
            font-size: 11px;
            letter-spacing: 0.2em;
            text-align: center;
            text-transform: uppercase;
        }
        .flag:after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 0;
            height: 0;
            border-bottom: 13px solid white;
            border-left: 55px solid transparent;
            border-right: 55px solid transparent;
        }

        .egg {
            margin-top: 35px;
            display: block;
            width: 126px;
            height: 180px;
            background-color: red;
            -webkit-border-radius: 63px 63px 63px 63px / 108px 108px 72px 72px;
            border-radius: 50%  50%  50%  50% / 60% 60% 40% 40%;
        }

        .pacman {
            width: 0px;
            height: 0px;
            border-right: 60px solid transparent;
            border-top: 60px solid red;
            border-left: 60px solid red;
            border-bottom: 60px solid red;
            border-top-left-radius: 60px;
            border-top-right-radius: 60px;
            border-bottom-left-radius: 60px;
            border-bottom-right-radius: 60px;
        }

        .moon {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            box-shadow: 15px 15px 0 0 red;
        }
    `]
})
export class CssShapesComponent { }