import {getSlice} from './redux.utility';
import {types} from './root.actions';

const technologiesListSlice=getSlice(types.TECHNOLOGIES_LIST);
const modulesListSlice=getSlice(types.MODULES_LIST);
const topicsListSlice=getSlice(types.TOPIC_LIST);
const subtopicListSlice=getSlice(types.TSUBTOPIC_LIST);

export{
    technologiesListSlice,modulesListSlice,topicsListSlice,subtopicListSlice
};
