"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestSeeder = void 0;
const eventRepository_1 = require("./../repositories/eventRepository");
const guestRepository_1 = require("./../repositories/guestRepository");
class GuestSeeder {
    async run(dataSource, factoryManager) {
        const name = "Aline";
        const email = "aline@gmail.com";
        const phone = "123456789";
        const eventSeed = await eventRepository_1.eventRepository.findOneBy({ id: Number(1) });
        if (eventSeed) {
            const newGuest = guestRepository_1.guestRepository.create({
                name,
                email,
                phone
            });
            await guestRepository_1.guestRepository.save(newGuest);
        }
    }
}
exports.GuestSeeder = GuestSeeder;
