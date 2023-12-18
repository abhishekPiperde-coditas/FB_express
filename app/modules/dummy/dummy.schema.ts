import { model } from 'mongoose';
import { BaseSchema } from '../../utility/base.schema';
import { IDummy } from './dummy.types';

const dummySchema = new BaseSchema({
    dummyName: {
        type: String,
        required: true
    },
    dummyAge: {
        type: Number,
        required: true
    }
});

type IDummyDocument = Document & IDummy;

const DummyModel = model<IDummyDocument>("Dummy", dummySchema);

export default DummyModel;

// class DummySchema extends Schema {
//     public static dummyDb: any[] = [];

//     get() {
//         return DummySchema.dummyDb;
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