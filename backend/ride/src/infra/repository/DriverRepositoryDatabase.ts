import pgp from "pg-promise";
import DriverRepository from "../../application/repository/DriverRepository";
import Driver from "../../domain/Driver";

export default class DriverRepositoryDatabase implements DriverRepository {

	async save (driver: Driver) {
		const connection = pgp()("postgres://postgres:postgres@localhost:5432/branas");
		await connection.query("insert into driver (driver_id, name, email, document, car_plate) values ($1, $2, $3, $4, $5)", [driver.driverId, driver.name, driver.email.value, driver.document.value, driver.carPlate.value]);
		await connection.$pool.end();
	}

	async get (driverId: string) {
		const connection = pgp()("postgres://postgres:postgres@localhost:5432/branas");
		const [driverData] = await connection.query("select * from driver where driver_id = $1", [driverId]);
		await connection.$pool.end();
		return new Driver(driverData.driver_id, driverData.name, driverData.email, driverData.document, driverData.car_plate);
	}
}