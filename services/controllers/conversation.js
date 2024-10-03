import {
  CREATE_NEW_CONVERSATION_CALL,
  GET_MESSAGE_CALL,
  GET_OLD_CONVERSATION_CALL,
  SEARCH_CONVERSATION_CALL,
} from "../conversationRequest";

/**
 * Conversation controller
 */
class ConversationController {
  constructor(error) {
    this.error = error;
  }

  CREATE_NEW_CONVERSATION(data, setOutput, setChatUserCode, userStatus) {
    CREATE_NEW_CONVERSATION_CALL(data)
      .then((response) => {
        setOutput(response.data);
        setChatUserCode(
          userStatus == "mentor"
            ? "student".concat(response.data.id)
            : "mentor".concat(response.data.id)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  GET_OLD_CONVERSATION(page) {
    return GET_OLD_CONVERSATION_CALL(page)
      .then((response) => {
        let returningData = [];
        response.data.conversationData.map((data) => {
          returningData.push({
            id: data.id,
            lastText: data.lastText,
            name: data.name,
            profilePic: data.profilePic,
            userStatus: data.userStatus,
            timeStamp: new Date(data.updatedAt).getTime(),
            isOnline: data.isOnline,
          });
        });
        return returningData;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  GET_MESSAGE(conversationId, pageNumber = 1) {
    GET_MESSAGE_CALL(conversationId, (pageNumber = 1))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  Search(keyword, page) {
    return SEARCH_CONVERSATION_CALL(keyword, page)
      .then((response) => {
        let returningData = [];
        response.data.forEach((data) => {
          if (data?.lastText) {
            returningData.push({
              id: data.id,
              chatDetails:data.chatDetails,
              lastText: data.lastText,
              name: data.name,
              profilePic: data.profilePic,
              userStatus: data.userStatus,
              timeStamp: new Date(data.updatedAt).getTime(),
              isOnline: data.isOnline,
              lastActive: data.lastActive,
              isUnread:data.isUnread,
            });
          }
        });

        return returningData;
      })
      .catch((error) => {
        return error;
      });
  }
}
export default new ConversationController();
