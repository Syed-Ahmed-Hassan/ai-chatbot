import mitt from "mitt";

type Events = {
  sideBarEvent: void;
  newChatEvent: void;
};

const emitter = mitt<Events>();

export default emitter;
