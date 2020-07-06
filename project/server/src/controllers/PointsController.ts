import { Request, Response } from "express";
import knex from "../database/connection"; // conexão com o banco de dados

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    //tira os espaços entre as paravras chaves pesquisadas
    const parsedItems = String(items)
      .split(",")
      .map(item => Number(item.trim()));
      
    const points = await knex('points')
    .join('point_items', 'points.id', '=', 'point_items.point_id')
    .whereIn('point_items.item_id', parsedItems)
    .where('city', String(city))
    .where('uf', String(uf))
    .distinct()
    .select('points.*');
    
    return response.json(points);
  }
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex("points").where("id", id).first();
    if (!point) {
      return response.status(400).json({ messege: "Point not found" });
    }
    /**
     * SELECT * FROM items
     *  JOIN point_items ON items.id = point_items.item_id
     *  WHERE point_items.point_id = {id};
     */
    const items = await knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("items.title");

    return response.json({ point, items });
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    //trx = transection
    const trx = await knex.transaction();

    const point = {
      image: "https://scontent.fpoo2-1.fna.fbcdn.net/v/t1.0-9/p960x960/72644583_2559652424125562_8426269597556015104_o.png?_nc_cat=110&_nc_sid=85a577&_nc_eui2=AeHQgyOKVjRIOK3DCmQ-MD_mPNsv1i8vE4k82y_WLy8TiXlhpKxoElRiJf0hdRlNU1vVQMVYyrTGawUziiT1Fp99&_nc_ohc=DKGxWQ-G_FUAX-RgCBp&_nc_ht=scontent.fpoo2-1.fna&oh=f716f5620d8e3acf6a07fd7459901d72&oe=5F28E421",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedIds = await trx("points").insert(point);

    const point_id = insertedIds[0];

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    });
    await trx("point_items").insert(pointItems);

    await trx.commit();

    return response.json({
      id: point_id,
      ...point,
    });
  }
}

export default PointsController;
