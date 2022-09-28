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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const User_1 = require("./User");
const Quotation_1 = require("./Quotation");
const Guest_1 = require("./Guest");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let Event = class Event {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Event.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.Length)(1, 300),
    __metadata("design:type", String)
], Event.prototype, "place", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.Length)(1, 300),
    __metadata("design:type", String)
], Event.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.Length)(1, 300),
    __metadata("design:type", Date)
], Event.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        nullable: false
    }),
    __metadata("design:type", Date)
], Event.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        nullable: false
    }),
    __metadata("design:type", Date)
], Event.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.event),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", User_1.User)
], Event.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Quotation_1.Quotation, quotation => quotation.event_id),
    __metadata("design:type", Array)
], Event.prototype, "quotation", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Guest_1.Guest, (guest) => guest.event),
    __metadata("design:type", Array)
], Event.prototype, "guest", void 0);
Event = __decorate([
    (0, typeorm_1.Entity)("event")
], Event);
exports.Event = Event;
