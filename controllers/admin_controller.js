import AdminModel from "../models/admin_model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export async function getAdmins(req, res) {
  try {
    const admins = await AdminModel.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error : error.message });
  }
}

export async function getAdminById(req, res) {
  try {
    const admin = await AdminModel.findById(req.params.id);
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error : error.message });
  }
}

export async function postAdmin(req, res) {
  try {
    let admin = req.body;
    const salt = await bcrypt.genSalt();
    admin.password = await bcrypt.hash(admin.password, salt);
    const newAdmin = await AdminModel.create(admin);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error : error.message });
  }
}

export async function updateAdmin(req, res) {
  try {
    const admin = await AdminModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators:true
    });
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error : error.message });
  }
}

export async function deleteAdmin(req, res) {
  try {
    const admin = await AdminModel.findByIdAndDelete(req.params.id);
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error : error.message });
  }
}

export async function login(req, res) {
  try {
    const admin = await AdminModel.findOne({ email: req.body.email });
    if (admin && (await bcrypt.compare(req.body.password, admin.password))) {
      const token = generateToken({ userId: admin._id, role: "admin" });
      return res.status(200).json({ message: "connected!", token });
    }
    res.status(400).json("email or password incorrect!");
  } catch (error) {
    res.status(500).json({ error : error.message });
  }
}
