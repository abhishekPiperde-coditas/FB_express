import DummyModel from "./dummy.schema";

const get = () => DummyModel.findOne();

export default {
    get
}