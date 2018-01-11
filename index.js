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
      //return list of customers
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

    meals() {
      //return instance
    }

    deliveries() {
      //return instance
    }

    totalSpent() {

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
      console.log(store.meals);
      console.error('-')
      return store.meals.sort(function(a,b) {
        return a.price < b.price
      })
      //return meals sorted by price
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
  }
}
const Delivery = createDelivery();
// END DELIVERY
