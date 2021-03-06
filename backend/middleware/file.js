const upload = (req, res, next) => {
	if (req.files.image.type) {
		let type = req.files.image.type;

		if (
			type !== "image/png" &&
			type !== "image/jpg" &&
			type !== "image/jpeg" &&
			type !== "image/gif"
		)
			return res
				.status(400)
				.send("This format is not valid. Formats valids jpg, jpeg, png y gif");
		next();
	} else {
		next();
	}
};

module.exports = upload;
