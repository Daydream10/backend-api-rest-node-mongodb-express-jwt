import { User } from "../models/User.js";

export const register = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = new User({ email, password });
    await user.save()

    //jwt token

    return res.status(201).json({ ok: true })
  } catch (error) {
    console.log(error.code);
    if (error.code == 11000) {
      return res.status(400).json({ error: 'Email already registered' })
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    let user = await User.findOne({ email });
    if (!user)
      return res.status(403).json({ error: "user doesn't exist" })

    const passwordResponse = await user.comparePassword(password)
    if (!passwordResponse) 
        return res.status(403).json({ error: "Wrong Password" })

    return res.json({ ok: "login" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server Error" })
  }
}