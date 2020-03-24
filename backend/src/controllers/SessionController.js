import connection from "../database/connection";

module.exports = {
  async store(request, response) {
    const { id } = request.body;

    const ong = await connection("ongs")
      .where("id", id)
      .select("name")
      .first();

    if (!ong) {
      return response.status(400).json({
        error: "No ong found with this id"
      });
    }

    return response.json(ong);
  }
};
