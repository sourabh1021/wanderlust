const Listing = require("../models/listing")

module.exports.Index = async (req, res, next) => {
  let allListing = await Listing.find({});
  res.render("listings/index.ejs", { allListing });
}

module.exports.renderNewform = (req, res) => {
  // console.log(req.user)
 
  res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res, next) => {
  let { id } = req.params;
    let oneData = await Listing.findById(id)
    .populate({
      path:"reviews",
      populate:{
        path:"author" // this for getting author for every review using nexted populate
      }})
  .populate("owner");
  if(!oneData){
   req.flash("error","Listing you requested for does not exist!")
   return res.redirect("/listings");   //  RETURN added
} 
  // console.log(oneData)
  res.render("listings/show.ejs", { oneData });
}
module.exports.createListing = async (req, res, next) => {
  //   let { title, description,image, price, location, country } = req.body; m1
  const url = req.file.path
  const filename = req.file.filename
  const newlisting = new Listing(req.body.listing) //m2 listing is object
  //   await Listing.insertOne({ title, description, image,price, location, country }); m1
  newlisting.owner = req.user._id
  newlisting.image = {url,filename}
  await newlisting.save() //m2
  req.flash("success","New listing created!")
  res.redirect("/listings");
  
}

module.exports.renderEditForm = async (req, res, next) => {
  const { id } = req.params;
  const editListing = await Listing.findById(id);
  if(!editListing){
     req.flash("error","Listing you requested for does not exist!")
     return res.redirect("/listings")
  }
  res.render("listings/edit.ejs", { editListing });
}

module.exports.updateListing = async (req, res, next) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success","listing Updated!")
  res.redirect(`/listings/${id}`);
}

module.exports.Deletelisitng = async (req, res, next) => {
  let { id } = req.params
  let deleted = await Listing.findByIdAndDelete(id)
  // console.log(deleted)
  req.flash("success","listing Deleted!")
  res.redirect("/listings")
} 