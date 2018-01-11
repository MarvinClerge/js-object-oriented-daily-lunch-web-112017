let store = {employers: [], customers: [], meals: [], deliveries: []}

//START EMPLOY
function createEmployer() {
  let id = 0

  return class {
    constructor(name) {
      ++id
      this.id = id;
      this.name = name;

      store.employers.push(this);
    }

    employees() {
      let theThis = this
      return store.customers.filter(function(c) {
        return c.employerId === theThis.id
      })
    }

    deliveries() {
      //return list
    }

    meals() {
      //return list by employe, uniq
    }

    mealTotals() {
      //return object {meal id: total number of times order}
    }
  }
}
const Employer = createEmployer();
// END EMPLOY


//START CUSTOMER
function createCustomer() {
  let id = 0

  return class {
    constructor(name, employer) {
      ++id
      this.id = id;
      this.name = name;
      if (employer) {
        this.employerId = employer.id
      }

      store.customers.push(this);
    }

    meals() {}
      // let theThis = this
      // let newArr = []
      //
      //
      // let mIds = this.deliveries().map(function(x) {
      //   console.log(x)
      //   return x.mealId
      // })
      //
      // for (const meal of store.meals) {
      //   for (const mid in mIds) {
      //     meal.id === mid
      //   }}['name']
      // }


      // return store.meals.find(function(m) {
      //     m.id === meal.
      //   })
      // }

      // let hi = this.deliveries().map(function(x) {
      //   x = x.mealId
      // });
      // console.log(hi);
      // store.deliveries.forEach(function(del) {
      //   if (del.customerId == theThis.id) {
      //     newArr.push(del.mealId)
      //   }
      // })


      // return newArr

      // let theThis = this
      // return store.deliveries.filter(function(d) {
      // })



    deliveries() {
      let theThis = this
      return store.deliveries.filter(function(d) {
        return d.customerId === theThis.id
      })
    }



    totalSpent() {
      return this.meals().reduce(function(total, current) {
        return total + current.price
      }, 0)
    }

  }
}
const Customer = createCustomer();
// END CUSTOMER

//START MEAL
function createMeal() {
  let id = 0

  return class {
    constructor(title, price) {
      ++id
      this.id = id;
      this.title = title;
      this.price = price;

      store.meals.push(this);
    }

    static byPrice() {
      return store.meals.sort(function(a,b) {
        return a.price < b.price
      })
    }
  }
}
const Meal = createMeal();
// END MEAL

//START DELIVERY
function createDelivery() {
  let id = 0

  return class {
    constructor(meal, customer) {
      ++id
      this.id = id;
      if (meal) {
        this.mealId = meal.id
      }
      if (customer) {
        this.customerId = customer.id
      }

      store.deliveries.push(this);
    }

    customer() {
      let theThis = this
      return store.customers.filter(function(c) {
        return c.id === theThis.customerId
      })[0]
    }

    meal() {
      if (delivery) {
        this.deliveryId - delivery.id
      }
      let theThis = this

      return store.meals.filter(function(c) {
        return c.id === theThis.mealId
      })[0]
    }

  }
}
const Delivery = createDelivery();
// END DELIVERY
