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
const typeorm_1 = require("typeorm");
let user = class user {
    constructor() {
        this.ID = "";
        this.FullName = "";
        this.CreateTime = new Date(Date.now());
        this.UpdateTime = new Date(Date.now());
    }
};
user.EntityName = "User";
__decorate([
    typeorm_1.PrimaryColumn("nvarchar"),
    __metadata("design:type", String)
], user.prototype, "ID", void 0);
__decorate([
    typeorm_1.Column("nvarchar"),
    __metadata("design:type", String)
], user.prototype, "FullName", void 0);
__decorate([
    typeorm_1.Column("datetime"),
    __metadata("design:type", Date)
], user.prototype, "CreateTime", void 0);
__decorate([
    typeorm_1.Column("datetime"),
    __metadata("design:type", Date)
], user.prototype, "UpdateTime", void 0);
user = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [])
], user);
exports.user = user;
