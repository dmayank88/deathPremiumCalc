using Microsoft.AspNetCore.Mvc;

namespace BackendPremium.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class PremiumCalcController : ControllerBase
    {

        private readonly ILogger<PremiumCalcController> _logger;

        public PremiumCalcController(ILogger<PremiumCalcController> logger)
        {
            _logger = logger;

        }

        /// <summary>
        ///  API to calculate death premium
        /// </summary>
        /// <param name="selectedOccupation"></param>
        /// <param name="age"></param>
        /// <param name="coveramount"></param>
        /// <returns></returns>
        [HttpGet]
        public double GetDeathPemiumCalculated(string selectedOccupation, int diffDays, double coveramount)
        {
            double DeathPremium = 0.0;
            try
            {
                PremiumCalcRepo premiumCalcRepo = new PremiumCalcRepo();
                double ratingfactor =
                    premiumCalcRepo.GetRatingFactor(selectedOccupation);

                double yrs = (diffDays / 365.25);
               
                //Calcaulate Death Premium
                DeathPremium = (coveramount * ratingfactor * yrs) / 1000 * 12;

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return Math.Round(DeathPremium, 2);


        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public IEnumerable<OccupationFields> GetOccupations()
        {
            PremiumCalcRepo premiumCalcRepo = new PremiumCalcRepo();
            return premiumCalcRepo.GetAllOccupations().ToArray();
        }
    }
}
