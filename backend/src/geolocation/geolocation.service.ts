import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class GeolocationService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async assignBaker(userLat: number, userLong: number): Promise<User> {
    const bakers = await this.usersRepository.find({ where: { role: 'baker' } });
    let closest: User | null = null;
    let minDist = Infinity;

    bakers.forEach((baker) => {
      if (!baker.geoLat || !baker.geoLong) return;
      const dist = this.haversine(userLat, userLong, baker.geoLat, baker.geoLong);
      if (dist < minDist && baker.workload < 10) { // Example threshold
        minDist = dist;
        closest = baker;
      }
    });

    if (!closest) throw new BadRequestException('No available bakers');
    // Update workload
    closest.workload += 1;
    await this.usersRepository.save(closest);
    return closest;
  }

  private haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
