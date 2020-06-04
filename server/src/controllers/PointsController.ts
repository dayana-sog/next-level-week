import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  async create(req: Request, res: Response) {
    const {
      name, 
      email, 
      whatsapp,
      latitude, 
      longitude,
      city, 
      uf, 
      items,
    } = req.body;
  
    //Como possui dois inserts e um depende do outro, deve-se usar o ...
    // ...transiction e substituir onde fica o knex
    const trx = await knex.transaction();
  
    const point = {
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      name, 
      email, 
      whatsapp,
      latitude, 
      longitude,
      city, 
      uf,
    };

    const insertedIds = await trx('point').insert(point);
  
    const point_id= insertedIds[0];
  
    const poistItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    })
  
    await trx('point_items').insert(poistItems);

    await trx.commit();
  
    return res.json({ 
      id: point_id,
      ...point,
      message: 'Cadastro realizado com sucesso' 
    });
  }

  async show(req: Request, res: Response) {
    const {id} = req.params;

    const point = await knex('point').where('id', id).first();

    if(!point) {
      return res.status(400).json({ message: 'Point not found' });
    }

    /**
     * SELECT * FROM items
     *  JOIN point_items ON items.id = point_items.items_id
     *  WHERE point_items.point_id = {id}
     *  
     */

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    return res.json({ point, items });
  }

  async index(req: Request, res: Response) {
    const { city, uf } = req.query;

    /*const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));*/

    const points = await knex('point')
      .join('point_items', 'point.id', '=', 'point_items.point_id')
      //.whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('point.*')


    return res.json(points);
  }

};

export default PointsController;