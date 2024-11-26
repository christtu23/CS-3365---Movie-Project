/* Movies Controller -> Contains API Function Logic */

const Theatre = require("../Models/Theatre");

//Create Theatre
const CreateTheatre = async (req, res) => {
    try{
        const{name, location, contactInfo, hours, screens} = req.body;

        const newTheatreLocation = new Theatre({
            name, location, contactInfo, hours, screens
        });

        await newTheatreLocation.save();
        res.status(201).json({message:"[X][MBS]: Theatre Added Successfully!",Theatre:newTheatreLocation});
    }catch(error)
    {
        console.error(error);
        res.status(500).json({message:"[X][MBS]: Error Creating Theatre", error:error.message})
    }
};

//Get All Theatres
const GetAllTheatres = async(req, res) => {
    try {
        const theatres = await Theatre.find(); // Retrieve all theatres
        res.status(200).json(theatres);
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: "[X][MBS]: Error fetching theatres", error: err.message });
    }
}

//Get Theatre By Id
const GetTheatreById = async (req, res) => {
    try {
        const theatreId = req.params.id;
        const theatre = await Theatre.findById(theatreId); // Find theatre by ID
        if (!theatre) {
            return res.status(404).json({ message: "[X][MBS]: Theatre not found" });
        }
        res.status(200).json(theatre);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "[X][MBS]: Error fetching theatre", error: err.message });
    }
};

//Update Theatre
const UpdateTheatre = async (req, res) => {
    try {
        const theatreId = req.params.id;
        const updatedData = req.body;
        const updatedTheatre = await Theatre.findByIdAndUpdate(theatreId, updatedData, { new: true }); // Update and return updated theatre

        if (!updatedTheatre) {
            return res.status(404).json({ message: "Theatre not found" });
        }

        res.status(200).json({ message: "Theatre updated successfully!", theatre: updatedTheatre });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating theatre", error: err.message });
    }
};

// Delete a theatre
const DeleteTheatre = async (req, res) => {
    try {
        const theatreId = req.params.id;
        const deletedTheatre = await Theatre.findByIdAndDelete(theatreId); // Delete theatre by ID

        if (!deletedTheatre) {
            return res.status(404).json({ message: "Theatre not found" });
        }

        res.status(200).json({ message: "Theatre deleted successfully!", theatre: deletedTheatre });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting theatre", error: err.message });
    }
};

module.exports = { CreateTheatre, GetAllTheatres, GetTheatreById,UpdateTheatre,DeleteTheatre };