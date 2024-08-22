import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";


export default async function handle(req, res) {
  const method = req.method;

  await mongooseConnect();

  if (method === "POST") {
    const { name, surname, email, password, points } = req.body;

    try {
      // Генеруємо сіль для додаткового забезпечення паролю
      

      const newUser = await User.create({
        name,
        surname,
        email,
        password, 
        points,
      });

      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      console.error("Error during user creation:", error);
      res.status(500).json({ success: false, message: "Помилка під час створення користувача" });
    }
  } else if (method === "GET") {
    const { email } = req.body;

    // Знайти користувача за його email у базі даних
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      res.status(200).json({ success: true, data: user });
    }
  } else if (method === "PUT") {
    try {
      const { email } = req.query;
      const { name, surname, password ,points} = req.body;

      // Оновити дані користувача, включаючи пароль
      const user = await User.findOneAndUpdate(
        { email },
        { name, surname, password ,points},
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Користувача не знайдено" });
      }

      res.status(200).json({ success: true, data: user });
    } catch (error) {
      console.error("Error during updating user:", error);
      res
        .status(500)
        .json({
          success: false,
          message: "Помилка під час оновлення користувача",
        });
    }
  } else {
    res.status(405).json({ success: false, message: "Метод не підтримується" });
  }
}