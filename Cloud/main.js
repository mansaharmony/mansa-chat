// cloud/main.js

// User-related cloud functions
Parse.Cloud.define("registerUser", async (request) => {
  const user = new Parse.User();
  user.set("username", request.params.username);
  user.set("password", request.params.password);
  try {
    await user.signUp();
    return { status: "success", message: "User registered successfully!" };
  } catch (error) {
    throw new Error("Error: " + error.message);
  }
});

Parse.Cloud.define("loginUser", async (request) => {
  try {
    const user = await Parse.User.logIn(request.params.username, request.params.password);
    return { status: "success", message: `Login successful! Welcome ${user.get("username")}` };
  } catch (error) {
    throw new Error("Error: " + error.message);
  }
});

// Messaging-related cloud functions
Parse.Cloud.define("sendMessage", async (request) => {
  const Message = Parse.Object.extend("Message");
  const message = new Message();
  message.set("sender", request.params.sender);
  message.set("receiver", request.params.receiver);
  message.set("content", request.params.content);
  
  try {
    await message.save();
    return { status: "success", message: "Message sent!" };
  } catch (error) {
    throw new Error("Error: " + error.message);
  }
});
