angular.module('dateFilter', []).filter('parseDate', function() {
  return function(timestamp,required, returntype) {
  			var date = new Date(timestamp);
  			this.months = {
  				month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
       			month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
   			}
			this.dateObj={}
			this.dateObj.year = date.getFullYear();
			this.dateObj.month = date.getMonth();
			this.dateObj.day = date.getDate();
			this.dateObj.hours = date.getHours();
			this.dateObj.minutes = date.getMinutes();
			this.dateObj.seconds = date.getSeconds();

			switch(required)
			{
				case 'year':
					return this.dateObj.year;
				break;
				case 'month':
					if(returntype=='num')
					{
						return this.dateObj.month;
					}
					else 
					{
						if(returntype=='short')
						{
							return this.months.month_names_short[this.dateObj.month];
						}
						else
						{
							return this.months.month_names[this.dateObj.month];
						}
					}
					
				break;
				case 'day':
					return this.dateObj.day;
				break;
				case 'hours':
					return this.dateObj.hours;
				break;
				case 'minutes':
					return this.dateObj.minutes;
				break;
				case 'seconds':
					return this.dateObj.seconds;
				break;
				default:
					return this.dateObj;
			}

			
  };
});