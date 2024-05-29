import HttpError from "../helpers/HttpError.js";
import Contact from "../models/contact.js";

export const getAllContacts = async (_, res, next) => {
  try {
    const contacts = await Contact.find({ owner: req.user.id });

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactToFind = await Contact.findOne({
      _id: id,
      owner: req.user.id,
    });

    if (!contactToFind) throw HttpError(404);

    res.status(200).json(contactToFind);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactToDelete = await Contact.findOneAndDelete({
      _id: id,
      owner: req.user.id,
    });

    if (!contactToDelete) throw HttpError(404);

    res.status(200).json(contactToDelete);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const owner = req.user.id;
    const newContact = { ...req.body, owner };

    const contact = await Contact.create(newContact);

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: id, owner: req.user.id },
      req.body,
      {
        new: true,
      }
    );

    if (!updatedContact) throw HttpError(404);

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findOneAndUpdate(
      { _id: id, owner: req.user.id },
      req.body,
      {
        new: true,
      }
    );

    if (!contact) throw HttpError(404);

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};
