namespace BackendPremium
{
    public class PremiumCalcRepo : IPremiumCalcRepo
    {
      
        List<RatingFields> lstRatingFactor = new List<RatingFields>
        {
            new RatingFields{ratingName="Professional",ratingFactor= 1.0 },
            new RatingFields{ratingName="White Collar",ratingFactor= 1.25 },
            new RatingFields{ratingName="Light Manual",ratingFactor= 1.50 },
            new RatingFields{ratingName="Heavy Manual",ratingFactor= 1.75 }
        };

        List<OccupationFields> lstOccupations = new List<OccupationFields>
        {   
            new OccupationFields{id="Cleaner", rating= "Light Manual" },
            new OccupationFields{id="Doctor", rating= "Professional" },
            new OccupationFields{id="Author",rating= "White Collar" },
            new OccupationFields{id="Farmer",rating="Heavy Manual" },
            new OccupationFields{id="Mechanic",rating="Heavy Manual" },
            new OccupationFields{id="Florist",rating="Light Manual" }

        };
      

        public List<OccupationFields> GetAllOccupations()
        {
            return lstOccupations;
        }
        public List<RatingFields> GetAllRatingFactors()
        {
            return lstRatingFactor;
        }
        public double GetRatingFactor(string ratingName)
        {
            double ratingFactor = 0.0;
            ratingFactor= lstRatingFactor.Where(x => x.ratingName == ratingName).Select(y=>y.ratingFactor).FirstOrDefault();
            return ratingFactor;
        }
    }
}