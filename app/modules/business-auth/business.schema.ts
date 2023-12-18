import { model } from 'mongoose';
import { BaseSchema } from '../../utility/base.schema';
import { IBusiness } from './business.types';

const businessSchema = new BaseSchema({
    businessName: {
        type: String,
        required: true
    },
    businessAge: {
        type: Number,
        required: true
    }
});

type IBusinessDocument = Document & IBusiness;

const BusinessModel = model<IBusinessDocument>("Business", businessSchema);

export default BusinessModel;

// class DummySchema extends Schema {
//     public static businessDb: any[] = [];

//     get() {
//         return DummySchema.businessDb;
//     }
// }

// const dummySchema = new DummySchema();

// export default dummySchema;


// ADD a product
// name
// product code
// MRP
// discount %
// location


// see a list of all products
// except the deleted products

// update a product

// delete a product
// isDeleted: true

// GENERIC way of creating the schema
// where the Schema class is extended
// class ProductSchema extends Schema {
    
// }