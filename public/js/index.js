window.addEventListener('DOMContentLoaded', function () {
    // hide loading indicator.
    hideLoading();
    // set header information
    const authenticatedUser = JSON.parse(localStorage.getItem('auth'));
    if (authenticatedUser) {
      // get logout button
      const logoutButon = document.getElementById('header__logout');
      // show authenticated user on the header.
      const headerRight = document.getElementById('header__right');
      const userImage = document.getElementById('user__image');
      const userName = document.getElementById('user__name');

      // main card item.
      const mainCardEmptyMessage = document.getElementById('main__card-empty');
      const mainCardItemContainer = document.getElementById('main__card-item-container');

      // main card actions.
      const mainCardActions = document.getElementById('main__card-actions');
      const dislikeBtn = document.getElementById('dislike');
      const likeBtn = document.getElementById('like');

      // main left messages
      const mainLeftMessagesContainer = document.getElementById('main__left-messages');
      const mainLeftEmpty = document.getElementById('main__left-empty');

      // chatbox
      const chatBox = document.getElementById('chatbox');
    //   const chatBoxUserPet = document.getElementById('chatbox__user-pet');
      const chatBoxUserName = document.getElementById('chatbox__user-name');
      const chatBoxClose = document.getElementById('chatbox__close');
      const messageBottom = document.getElementById('message-bottom');
      const messageContainer = document.getElementById('message__container');

      const scrollToBottom = () => {
        if (messageBottom && messageBottom) {
          messageBottom.parentNode.scrollTop = messageBottom.offsetTop;
        }
      };

      const sendNotification = ({ message, type, receiverId }) => {
        const receiverID = receiverId;
        const customType = type;
        const receiverType = CometChat.RECEIVER_TYPE.USER;
        const customData = {
          message
        };
        const customMessage = new CometChat.CustomMessage(
          receiverID,
          receiverType,
          customType,
          customData
        );

        CometChat.sendCustomMessage(customMessage).then(
          message => {
          },
          error => {
          }
        );
      };

      const sendMessage = (inputMessage) => {
        if (inputMessage) {
          // call cometchat service to send the message.
          const message = new CometChat.TextMessage(
            selectedContact.uid,
            inputMessage,
            CometChat.RECEIVER_TYPE.USER
          );
          CometChat.sendMessage(message).then(
            msg => {
              // append new message on the UI.
              const sentMessage = {
                text: inputMessage,
                sender: {
                  pet: authenticatedUser.pet
                },
                isRight: true
              };
              renderSingleMessage(sentMessage);
              // scroll to bottom.
              scrollToBottom();
            },
            error => {
              alert('Cannot send you message, please try later');
            }
          );
        }
      };

      const isRight = (message) => {
        if (message.isRight !== null && message.isRight !== undefined) {
          return message.isRight;
        }
        return message.sender.uid === authenticatedUser.uid;
      };

      const renderSingleMessage = (message) => {
        if (message && isRight(message)) {
          messageContainer.innerHTML += `
            <div class="message__right">
              <div class="message__content message__content--right">
                <p>${message.text}</p>
              </div>
              <div class="message__pet">
               <img src="${message.sender.pet}"/>
              </div>
            </div>
          `;
        } else {
          messageContainer.innerHTML += `
            <div class="message__left">
              <div class="message__pet">
                <img src="${message.sender.pet}"/>
              </div>
              <div class="message__content message__content--left">
                <p>${message.text}</p>
              </div>
            </div>
          `;
        }
      };

      const renderMessages = (messages) => {
        if (messages && messages.length !== 0) {
          messages.forEach(message => {
            if (message) {
              renderSingleMessage(message);
            }
          });
          // scroll to bottom.
          scrollToBottom();
        }
      };

      const loadMessages = () => {
        const limit = 50;
        const messageRequestBuilder = new CometChat.MessagesRequestBuilder()
          .setCategories(['message'])
          .setTypes(['text'])
          .setLimit(limit);
        messageRequestBuilder.setUID(selectedContact.uid);

        const messagesRequest = messageRequestBuilder.build();

        messagesRequest
          .fetchPrevious()
          .then((messages) => {
            if (messages && messages.length !== 0) {
              renderMessages(messages);
            }
          })
          .catch((error) => { });
      };

      isCurrentUser = (selectedContact, selectedUid) => {
        return selectedContact && selectedUid && selectedContact.uid && selectedContact.uid === selectedUid;
      };

      const listenForNotifications = () => {
        CometChat.addMessageListener(
          notificationListenerID,
          new CometChat.MessageListener({
            onTextMessageReceived: (message) => {
              if (message && (!message.category || message.category !== 'call')) {
                const senderUid = message.sender.uid;
                if (selectedContact && selectedContact.uid === senderUid) {
                  renderSingleMessage(message);
                } else {
                  toastr.info(`There is new message from ${message.sender.name}`);
                }
              }
            },
            onCustomMessageReceived: customMessage => {
              console.log('Custom message received successfully', customMessage);
              // Handle custom message
              if (!selectedContact || (customMessage && customMessage.sender && customMessage.sender.uid && customMessage.sender.uid !== selectedContact.uid && customMessage.data && customMessage.data.customData && customMessage.data.customData.message)) {
                // Display an info toast with no title
                toastr.info(customMessage.data.customData.message);
                if (customMessage && customMessage.type && customMessage.type === 'match') {
                  loadFriends();
                }
              }
            }
          })
        );
      };

      window.openChatBox = (selectedUid, name, pet) => {
        if (selectedUid && name && pet && !isCurrentUser(selectedContact, selectedUid)) {
          selectedContact = { uid: selectedUid };
          chatBox.classList.remove('hide');
          chatBoxUserName.innerHTML = name;
          chatBoxUserAvatar.src = pet;
          messageContainer.innerHTML = '';
          loadMessages();
        }
      };

      const renderFriends = (userList) => {
        if (userList && userList.length !== 0) {
          userList.forEach(user => {
            if (user) {
              mainLeftMessagesContainer.innerHTML += `<div class="main__left-message" onclick="openChatBox('${user.uid}', '${user.name}', '${user.pet}')">
                <img
                  src="${user.pet}"
                  alt="${user.name}"
                />
                <span>${user.name}</span>
              </div>`;
            }
          });
        }
      };

      const loadFriends = () => {
        const appSetting = new CometChat.AppSettingsBuilder()
          .subscribePresenceForAllUsers()
          .setRegion(config.CometChatRegion)
          .build();
        CometChat.init(config.CometChatAppId, appSetting).then(
          () => {
            // You can now call login function.
            const limit = 30;
            const usersRequest = new CometChat.UsersRequestBuilder()
              .setLimit(limit)
              .friendsOnly(true)
              .build();
            usersRequest.fetchNext().then(
              userList => {
                if (userList && userList.length !== 0) {
                  mainLeftEmpty.classList.add('hide');
                  mainLeftMessagesContainer.innerHTML = '';
                  renderFriends(userList);
                } else {
                  mainLeftEmpty.classList.remove('hide');
                  mainLeftEmpty.innerHTML = 'You do not have any contact';
                }
              },
              error => {
              }
            );
          },
          (error) => {
            // Check the reason for error and take appropriate action.
          }
        );
      };

      const getCurrentCard = () => {
        const cards = document.getElementsByClassName('main__card-item');
        if (cards && cards.length !== 0) {
          for (const card of cards) {
            if (card.getAttribute('style')) {
              if (card.getAttribute('style').indexOf('display: block') != -1) {
                return card;
              }
            }
          }
          return null;
        }
        return null;
      };

      const showHeaderInformation = () => {
        if (headerRight && userImage && userName && authenticatedUser && authenticatedUser.uid) {
          headerRight.classList.remove('header__right--hide');
          userImage.src = authenticatedUser.avatar;
          userName.innerHTML = `Hello, ${authenticatedUser.name}`;
        }
      };

      const createMatchRequest = (matchRequestTo, matchRequestReceiver) => {
        if (authenticatedUser && authenticatedUser.uid && authenticatedUser.name && matchRequestTo && matchRequestReceiver) {
          axios.post('/requests/create', {
            matchRequestFrom: authenticatedUser.uid,
            matchRequestSender: authenticatedUser.name,
            matchRequestTo,
            matchRequestReceiver
          }).then(res => {
            if (res && res.data && res.data.match_request_status && res.data.match_request_status === 1) {
              addFriend(authenticatedUser.uid, matchRequestTo, matchRequestReceiver);
            }
          }).catch(error => { });
        }
      };

      const swipeRight = (element) => {
        $(element).addClass('rotate-left').delay(700).fadeOut(1);
        $('.main__card-item').find('.status').remove();
        $(element).append('<div class="status like">Like!</div>');
        $(element).next().removeClass('rotate-left rotate-right').fadeIn(400);
        const matchRequestTo = $(element).attr('data-id');
        const matchRequestReceiver = $(element).attr('data-name');
        createMatchRequest(matchRequestTo, matchRequestReceiver);
        setTimeout(() => {
          shouldHideMainCard();
        }, 1100);
      };

      const swipeLeft = (element) => {
        $(element).addClass('rotate-right').delay(700).fadeOut(1);
        $('.main__card-item').find('.status').remove();
        $(element).append('<div class="status dislike">Dislike!</div>');
        $(element).next().removeClass('rotate-left rotate-right').fadeIn(400);
        setTimeout(() => {
          shouldHideMainCard();
        }, 1100);
      };

      const applySwing = () => {
        $('.main__card-item').on('swiperight', function () {
          swipeRight(this);
        });
        $('.main__card-item').on('swipeleft', function () {
          swipeLeft(this);
        });
      };

      const renderCardList = (recommendedUsers) => {
        if (recommendedUsers && recommendedUsers.length !== 0) {
          const cardList = document.getElementById('main__card-item-container');
          recommendedUsers.forEach((user, index) => {
            if (index === 0) {
              cardList.innerHTML += `<div class="main__card-item" style="display: block;" data-id="${user.user_cometchat_uid}" data-name="${user.user_full_name}">
                <div class="pet" style="display: block; background-image: url(${user.user_pet})"></div>
                <span>${user.user_full_name}, ${user.user_age}</span>
              </div>`;
            } else {
              cardList.innerHTML += `<div class="main__card-item" data-id="${user.user_cometchat_uid}" data-name="${user.user_full_name}">
                <div class="pet" style="display: block; background-image: url(${user.user_pet})"></div>
                <span>${user.user_full_name}, ${user.user_age}</span>
              </div>`;
            }
          });
          applySwing();
        }
      };

      const showMainCard = () => {
        mainCardActions.classList.remove('hide');
        mainCardItemContainer.classList.remove('hide');
        mainCardEmptyMessage.classList.add('hide');
      };

      const hideMainCard = () => {
        mainCardActions.classList.add('hide');
        mainCardItemContainer.classList.add('hide');
        mainCardEmptyMessage.classList.remove('hide');
      };

      const shouldHideMainCard = () => {
        const nextCard = getCurrentCard();
        if (!nextCard) {
          hideMainCard();
        }
      };

      // call api to load recommended users.
      const loadRecommendedUsers = () => {
        axios
          .post('/users/recommend', {
            gender: authenticatedUser.gender === 'Male' ? 'Female' : 'Male',
            ccUid: authenticatedUser.uid,
          })
          .then((res) => {
            if (res && res.data && res.data.length !== 0) {
              showMainCard();
              renderCardList(res.data);
            }
          })
          .catch((error) => {
          });
      };

      const addFriend = (matchRequestFrom, matchRequestTo, matchRequestReceiver) => {
        if (matchRequestFrom && matchRequestTo) {
          const url = `https://${config.CometChatAppId}.api-${config.CometChatRegion}.cometchat.io/v3.0/users/${matchRequestTo}/friends`;
          axios.post(url, { accepted: [matchRequestFrom] }, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              appId: `${config.CometChatAppId}`,
              apiKey: `${config.CometChatAPIKey}`,
            }
          }).then(res => {
            const notificationMessage = {
              message: `Congratulation! ${authenticatedUser.name} and ${matchRequestReceiver} have been matched`,
              type: 'match',
              receiverId: matchRequestTo
            };
            toastr.info(notificationMessage.message);
            loadFriends();
            sendNotification(notificationMessage);
          }).catch(error => {
          });
        }
      };

      // add event for logout
      if (logoutButon) {
        logoutButon.addEventListener('click', function () {
          const isLeaved = confirm('Do you want to log out?');
          if (isLeaved) {
            // logout from cometchat and then clear storage.
            CometChat.logout().then((response) => {
              // User successfully logged out.
              // Perform any clean up if required.
              localStorage.removeItem('auth');
              // redirect to login page.
              window.location.href = '/login.html';
            });
          }
        });
      }

      if (dislikeBtn) {
        dislikeBtn.addEventListener('click', function () {
          const currentCard = getCurrentCard();
          if (currentCard) {
            swipeLeft(currentCard);
          } else {
            hideMainCard();
          }
        });
      }

      if (likeBtn) {
        likeBtn.addEventListener('click', function () {
          const currentCard = getCurrentCard();
          if (currentCard) {
            swipeRight(currentCard);
            setTimeout(() => {
              shouldHideMainCard();
            }, 1100);
          } else {
            hideMainCard();
          }
        });
      }

      if (chatBoxClose) {
        chatBoxClose.addEventListener('click', function () {
          messageContainer.innerHTML = '';
          chatBox.classList.add('hide');
          CometChat.removeMessageListener(selectedContact.uid);
          CometChat.removeCallListener(listenerID);
          selectedContact = null;
          upcomingCall = null;
          listenerID = null;
        });
      }

      $('#message-input').keyup(function (e) {
        if (e.keyCode === 13) {
          const inputMessage = e.target.value;
          if (inputMessage) {
            sendMessage(inputMessage);
            $(this).val('');
          }
        }
      });

      showHeaderInformation();
      loadRecommendedUsers();
      loadFriends();
      listenForNotifications();
    } else {
      // redirect user to the login page.
      window.location.href = '/login.html';
    }
  });