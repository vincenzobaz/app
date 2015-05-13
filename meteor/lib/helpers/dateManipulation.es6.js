if(!Date.prototype.adjustDateDays){
    Date.prototype.adjustDateDays = function(days){
        var date;

        days = days || 0;

        if(days === 0){
            date = new Date( this.getTime() );
        } else if(days > 0) {
            date = new Date( this.getTime() );

            date.setDate(date.getDate() + days);
        } else {
            date = new Date(
                this.getFullYear(),
                this.getMonth(),
                this.getDate() - Math.abs(days),
                this.getHours(),
                this.getMinutes(),
                this.getSeconds(),
                this.getMilliseconds()
            );
        }

        this.setTime(date.getTime());

        return this;
    };
}

if(!Date.prototype.adjustDateWeek){
    Date.prototype.adjustDateWeek = function(week){
        var date;

        week = week || 0;

        if(week === 0){
            date = new Date( this.getTime() );
        } else if(week > 0) {
            date = new Date( this.getTime() );

            date.setDate(date.getDate() + 7 * week);
        } else {
            date = new Date(
                this.getFullYear(),
                this.getMonth(),
                this.getDate() - Math.abs(7 * week),
                this.getHours(),
                this.getMinutes(),
                this.getSeconds(),
                this.getMilliseconds()
            );
        }

        this.setTime(date.getTime());

        return this;
    };
}

if(!Date.prototype.adjustDateMonth){
    Date.prototype.adjustDateMonth = function(month){
        var date;

        month = month || 0;

        if(month === 0){
            date = new Date( this.getTime() );
        } else if(month > 0) {
            date = new Date( this.getTime() );

            date.setDate(date.getMonth() + month);
        } else {
            date = new Date(
                this.getFullYear(),
                this.getMonth() - Math.abs(month),
                this.getDate(),
                this.getHours(),
                this.getMinutes(),
                this.getSeconds(),
                this.getMilliseconds()
            );
        }

        this.setTime(date.getTime());

        return this;
    };
}

if(!Date.prototype.adjustDateYear){
    Date.prototype.adjustDateYear = function(year){
        var date;

        year = year || 0;

        if(year === 0){
            date = new Date( this.getTime() );
        } else if(year > 0) {
            date = new Date( this.getTime() );

            date.setDate(date.getFullYear() + year);
        } else {
            date = new Date(
                this.getFullYear() - Math.abs(year),
                this.getMonth(),
                this.getDate(),
                this.getHours(),
                this.getMinutes(),
                this.getSeconds(),
                this.getMilliseconds()
            );
        }

        this.setTime(date.getTime());

        return this;
    };
}

