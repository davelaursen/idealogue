import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
    template: `
        <section>
            <h1 class="title">CSS Form Controls</h1>

            <div>
                <h2>Input</h2>

                <fieldset class="input1">
                    <label for="input1">
                        <span>First Name</span>
                    </label>
                    <input id="input1" type="text" (focus)="onFocus($event)" (blur)="onBlur($event)">
                </fieldset>

                <fieldset class="input2">
                    <label for="input2">
                        <span>First Name</span>
                    </label>
                    <input id="input2" type="text" (focus)="onFocus($event)" (blur)="onBlur($event)">
                </fieldset>

                <fieldset class="input3">
                    <label for="input3">
                        <span>First Name</span>
                    </label>
                    <input id="input3" type="text" (focus)="onFocus($event)" (blur)="onBlur($event)">
                </fieldset>

                <fieldset class="input4">
                    <label for="input4">
                        <span>First Name</span>
                    </label>
                    <input id="input4" type="text" (focus)="onFocus($event)" (blur)="onBlur($event)">
                </fieldset>
            </div>

            <div>
                <h2>Checkbox</h2>

                <fieldset class="checkbox checkbox1">
                    <label for="checkbox1"><input id="checkbox1" type="checkbox"> <span>is enabled</span></label>
                </fieldset>

                <fieldset class="checkbox checkbox2">
                    <label for="checkbox2"><input id="checkbox2" type="checkbox"> <span>is enabled</span></label>
                </fieldset>

                <fieldset class="checkbox checkbox3">
                    <label for="checkbox3"><input id="checkbox3" type="checkbox"> <span>is enabled</span></label>
                </fieldset>

                <fieldset class="checkbox checkbox4">
                    <label for="checkbox4"><input id="checkbox4" type="checkbox"> <span>is enabled</span></label>
                </fieldset>

                <br/><br/><br/>
                <h2>Radio Button</h2>

                <ul class="radio radio1">
                    <li>
                        <input type="radio" id="radio1a" name="radio1">
                        <label for="radio1a">First</label>
                    </li>
                    <li>
                        <input type="radio" id="radio1b" name="radio1">
                        <label for="radio1b">Second</label>
                    </li>
                    <li>
                        <input type="radio" id="radio1c" name="radio1">
                        <label for="radio1c">Third</label>
                    </li>
                </ul>
            </div>
        </section>
    `,
    styles: [`
        ul.radio {
            list-style: none;
            margin: 20px 0 0;
            padding: 0;
        }
        ul.radio li {
            display: inline-block;
            margin: 0 10px 0 20px;
        }
        ul.radio label {
            position: relative;
            margin: 0;
            margin-right: 5px;
            padding: 0;
            width: auto;
            text-align: left;
        }
        ul.radio input {
            visibility: hidden;
            position: absolute;
        }

        .radio1 label {
            padding-bottom: 3px;
        }
        .radio1 label::before {
            display: inline-block;
            content: "";
            width: 12px;
            height: 12px;
            margin: 0 5px;
            border: 1px solid #833;
        }

        section > div {
            display: inline-block;
            width: 40%;
            vertical-align: top;
        }

        fieldset {
            margin: 0;
            padding: 0;
            border: none;
            position: relative;
        }
        input {
            box-sizing: content-box;
            font-family: inherit;
            color: #555;
        }

        .input1 {
            margin-top: 50px;
        }
        .input1 label {
            margin: 0;
            position: absolute;
            top: 0;
            left: 0;
            width: 200px;
        }
        .input1 span {
            font-size: 16px;
            position: absolute;
            top: 15px;
            left: 10px;
            transition: all 0.2s;
        }
        .input1 input {
            display: inline-block;
            border: none;
            padding: 10px;
            height: 30px;
            width: 250px;
            font-size: 20px;
            outline: none;
            border-radius: 0;
            box-shadow: inset 0px 0px 0px 0px transparent;
            background: transparent;
            transition: all 0.3s;
        }
        .input1 label::after,
        .input1 label::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 1px;
            top: 4;
            left: 0;
            background: #ddd;
            transition: all 0.2s;
        }
        .input1 label::after {
            top: 45px;
        }
        .input1.has-value span {
            top: -25px;
        }
        .input1.has-value input {
            background: rgba(255,255,255,0.7);
        }
        .input1.has-value label::after,
        .input1.has-value label::before {
            top: -1px;
            background: #833;
            height: 2px;
        }
        .input1.has-value label::after {
            top: 50px;
        }

        .input2 {
            width: 250px;
            height: 50px;
            margin-top: 50px;
            background: #888;
            transition: all 0.2s;
        }
        .input2 label {
            margin: 0;
            position: absolute;
            top: 0;
            left: -2;
            width: 202px;
        }
        .input2 span {
            font-size: 16px;
            color: #666;
            width: 100%;
            text-align: center;
            position: absolute;
            top: 16px;
            left: 0;
            transition: all 0.2s;
        }
        .input2 input {
            display: inline-block;
            border: none;
            padding: 10px;
            margin: 3px;
            height: 24px;
            width: 244px;
            font-size: 20px;
            outline: none;
            border-radius: 0;
            box-shadow: inset 0px 0px 0px 0px transparent;
            background: rgba(255,255,255,1);
            transition: all 0.2s;
        }
        .input2.has-value span {
            top: -25px;
            font-size: 14px;
            color: #888;
        }
        .input2.has-value input {
            margin: 1px;
            height: 28px;
            width: 248px;
        }
        .input2.has-value {
            background: #833;
        }

        .input3 {
            width: 270px;
            height: 60px;
            margin-top: 50px;
            background: #888;
            transition: all 0.2s;
        }
        .input3 label {
            margin: 0;
            position: absolute;
            top: 0;
            left: -2;
            width: 202px;
            z-index: 1;
        }
        .input3 span {
            font-size: 16px;
            font-weight: 700;
            color: #666;
            position: absolute;
            top: 20px;
            left: 30px;
            transition: all 0.2s;
        }
        .input3 input {
            display: inline-block;
            border: none;
            padding: 2px;
            margin: 1px;
            height: 54px;
            width: 268px;
            font-size: 16px;
            outline: none;
            border-radius: 0;
            box-shadow: inset 0px 0px 0px 0px transparent;
            background: #fff;
            transition: all 0.2s;
        }
        .input3.has-value span {
            top: 5px;
            left: 7px;
            font-size: 14px;
            font-weight: 400;
            color: #fff;
        }
        .input3.has-value input {
            padding: 2px;
            margin: 27px 0 0 5px;
            height: 24px;
            width: 256px;
        }

        .input4 {
            margin-top: 50px;
        }
        .input4 label {
            margin: 0;
            position: absolute;
            top: 0;
            left: 0;
            width: 200px;
        }
        .input4 span {
            font-size: 16px;
            color: #999;
            position: absolute;
            top: 20px;
            left: 10px;
            transition: all 0.2s;
        }
        .input4 input {
            display: inline-block;
            border: none;
            padding: 10px 10px 5px;
            height: 30px;
            width: 250px;
            font-size: 20px;
            outline: none;
            border-radius: 0;
            box-shadow: inset 0px 0px 0px 0px transparent;
            background: transparent;
            transition: all 0.3s;
        }
        .input4 label::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 1px;
            top: 45px;
            left: 0;
            background: #bbb;
            transition: all 0.2s;
        }
        .input4.has-value span {
            top: 48px;
            font-size: 14px;
            color: #666;
        }
        .input4.has-value input {
            background: rgba(255,255,255,0.7);
        }
        .input4.has-value label::after {
            background: #833;
            height: 2px;
            top: 44px;
        }


        .checkbox label,
        input[type="checkbox"] + span,
        input[type="checkbox"] + span::before {
            display: inline-block;
            vertical-align: middle;
        }
        .checkbox label {
            margin: 0;
            padding-left: 25px;
            width: auto;
            text-align: left;
        }
        .checkbox label * {
            cursor: pointer;
        }
        .checkbox label:hover span::before {
            box-shadow: 0 0 2px #ccc;
        }
        input[type="checkbox"] {
            visibility: hidden;
            position: absolute;
        }
        input[type="checkbox"] + span {
            font-size: 13px;
            color: #333;
        }
        input[type="checkbox"] + span::after,
        input[type="checkbox"] + span::before {
            position: absolute;
            top: 1px;
            left: 0;
            content: "";
            width: 12px;
            height: 12px;
            border: 1px solid #a8a8a8;
            border-radius: 2px;
            text-align: center;
            background: radial-gradient(#f6f6f6, #dfdfdf);
        }
        input[type="checkbox"] + span::after {
            border-color: transparent;
            background: transparent;
            line-height: 14px;
            color: #666;
        }
        input[type="checkbox"]:disabled + span {
            cursor: default;
            opacity: .4;
        }
        input[type="checkbox"]:checked + span::after {
            content: "\\2714";
            font-size: 12px;
        }

        .checkbox1 {
            margin-top: 50px;
        }
        .checkbox1 input + span::before {
            border-radius: 0;
            background: #f1f1f1;
        }
        .checkbox1 input:checked + span::before {
            animation: bulge 0.3s linear;
        }
        @keyframes bulge {
            0% { transform: scale(1) }
            50% { transform: scale(1.3) }
            100% { transform: scale(1) }
        }

        .checkbox2 {
            margin-top: 20px;
        }
        .checkbox2 input + span::after {
            transform: scale(0);
            transition: all 0.3s;
        }
        .checkbox2 input:checked + span::after {
            transform: scale(1);
        }

        .checkbox3 {
            margin-top: 20px;
        }
        .checkbox3 input + span::before {
            border-radius: 0;
            background: #fff;
        }
        .checkbox3 input + span::before {
            border: 1px solid #833;
        }

        .checkbox4 {
            margin-top: 20px;
        }
        .checkbox4 input + span::before {
            border-radius: 0;
            background: #fff;
        }
        .checkbox4 input + span::before {
            border: 1px solid #833;
        }
        .checkbox4 input:checked + span::after {
            content: "";
            top: 4px;
            left: 2px;
            height: 3px;
            width: 7px;
            border-left: 2px solid #333;
            border-bottom: 2px solid #333;
            transform: rotate(-45deg);
            animation: checkbox-check 0.1s forwards;
        }
        @keyframes checkbox-check {
            0% { height: 0; width: 0; }
            33% { height: 3px; width: 0; }
            100% { height: 3px; width: 7px; }
        }
    `]
})
export class CssFormsComponent {

    onFocus(event: Event) {
        let fieldset = <HTMLElement>event.srcElement.parentElement;
        if (fieldset.className.indexOf('has-value') < 0) {
            fieldset.className += ' has-value';
        }
    }
    onBlur(event: Event) {
        let input = <HTMLInputElement>event.srcElement;
        let fieldset = <HTMLElement>event.srcElement.parentElement;
        if (!input.value || input.value.length === 0) {
            fieldset.className = fieldset.className.replace(' has-value', '');
        }
    }
}