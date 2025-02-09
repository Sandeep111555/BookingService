const {Logger} = require('../config');
//single repository for crud operation
class CrudRepository{
    constructor(model){
        this.model = model;
    }
    //create async function
    async create(data, options){
            const response = await this.model.create(data, options);
            return response;
    }
    //destroy async function takes data as id
    async destroy(data){
            const response = await this.model.destroy({
                where:{
                    id:data
                }
        });
            return response;
        }
    //update async function takes data as id and changes to the entry
    async update(id, data){
            const response = await this.model.update(data, {
                where:{
                    id: id
                }
        });
            return response;
        }
    //findAll function
        async findAll(){
                const response = await this.model.findAll();
                return response;
        }
        
    //find by pk function takes data as id
    async findByPk(id){
        const response = await this.model.findByPk(id);
        return response;
    }
}

module.exports = CrudRepository;