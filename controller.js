const _ = require('lodash');
const model = require('./model');

const ListingController ={};

ListingController.del = async (req,res,next)=>{
    try{
        const body = _.get(req,'body',{});
        if(!body.id){
            return res.status(422);
        }
        await model.findOneAndDelete({id: body.id})
        return res.status(200);
    }catch(err){
        return res.status(417).json({'message':err.message});
    }
}

ListingController.update = async(req,res)=>{
    try {
        const body = _.get(req, 'body', {});
        if (!body.id) {
            return res.status(422);
        }
        let id = body.id;
        delete body.id;
        await model.findOneAndUpdate({ id: id },{...body});
        return res.status(200);
    } catch (err) {
        return res.status(417).json({ 'message': err.message });
    }
}

ListingController.create = async (req,res) => {
    try {
        const body = _.get(req, 'body', {});
        if (!body.id) {
            return res.status(422);
        }
    
        await new model({ ...body });
        return res.status(200);
    } catch (err) {
        return res.status(417).json({ 'message': err.message });
    }
}

ListingController.view = async (req,res) => {
    try {
        const body = _.get(req, 'body', {});
        if (_.isEmpty(body)) {
            let response = await model.findAll()
            return res.status(200).json(response.toObject());
        }

        let filters ={};

        let location = _.get(body, 'country', null);

        if(location){
            filters.country = location;
        }

        let price = _.get(body,'price',[]);
        if(!_.isEmpty(price)){
            filter.rent={'$gte':price[0],'$lte':price[1]};
        }

        let rooms = _.get(body,'room',[]);
        if(!_.isEmpty(rooms)){
            filter.bedroom={'$in':rooms};
        }

        let sort = _.get(body,'sort',false)

        let offset = _.get(body,'offset',0);
        let limit =_.get(body,'limit',20);


        let response = await model.find(filters).skip(offset*limit).limit(limit).sort({'created_at':1});
        return res.status(200).json(response.toObject());
    } catch (err) {
        return res.status(417).json({ 'message': err.message });
    }

}



module.exports = ListingController;