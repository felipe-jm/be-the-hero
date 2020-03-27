import generateUniqueId from '../utils/generateUniqueId';
import connection from "../database/connection";

module.exports = {
  async index(request, response) {
    const ongs = await connection("ongs").select("*");

    return response.json(ongs);
  },

  async store(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;

    const id = generateUniqueId();

    await connection("ongs").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return response.json({ id });
  }
};
