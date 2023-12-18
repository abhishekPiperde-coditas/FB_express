import DummyModel from "./business.schema";

const get = () => DummyModel.findOne();

export default {
    get
}