namespace BackendPremium
{
    public interface IPremiumCalcRepo
    {
        List<RatingFields> GetAllRatingFactors();
        double GetRatingFactor(string ratingName);
        List<OccupationFields> GetAllOccupations();


    }

    
}