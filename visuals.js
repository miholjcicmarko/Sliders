class DataClass {

    constructor (numberOfSwipes, zions, other) {
        this.numberOfSwipes = +numberOfSwipes;
        this.zions = +zions;
        this.other = +other;
    }

}

class visuals {

    constructor (data, updateNumber) {

        this.data = data;
        this.updateNumber = updateNumber;
        this.slider = false;
        this.dataValues = [];

        for (let i = 0; i < this.data.length; i++) {
            let node = new DataClass(this.data[i].num_swipes, this.data[i].Zions,
                this.data[i].Others);
            this.dataValues.push(node);
        }

    }

}