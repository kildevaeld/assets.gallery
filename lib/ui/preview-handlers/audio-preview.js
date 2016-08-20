"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const views_1 = require('views');
const interfaces_1 = require('../interfaces');
let AudioPreview = class AudioPreview extends views_1.View {
    constructor(...args) {
        super(...args);
        this.template = function (data) {
            return `
			<audio controls>
				<source src="${this.model.getURL()}" type="${data.mime}" />
			</audio>
		`;
        };
    }
};
AudioPreview = __decorate([
    interfaces_1.preview('audio/mpeg', 'audio/wav', 'audio/ogg'), 
    __metadata('design:paramtypes', [])
], AudioPreview);
exports.AudioPreview = AudioPreview;
