let store = { employers: [], customers: [], meals: [], deliveries: [] }

const Customer = ( () => {
  let id = 0;

  return class Customer {
    constructor(name, employer) {
      this.id = ++id;
      this.name = name;
      if (employer) this.employerId = employer.id
      store.customers.push(this);
    }

    deliveries() {
      return store.deliveries.filter( delivery => {
        return delivery.customerId === this.id
      })
    }

    meals() {
      let mealIds = this.deliveries().map( delivery => {
        return delivery.mealId
      });

      return store.meals.filter( meal => {
        return mealIds.includes( meal.id )
      });
    }

    totalSpent(){
      return this.meals().reduce( (sum, meal) => {
        return sum + meal.price;
      }, 0)
    }

  }
})(); // Customers

const Meal = (() => {
  let id = 0;

  return class Meal {
    constructor(title, price) {
      this.id = ++id;
      this.title = title;
      this.price = price;
      store.meals.push(this);
    }

    static byPrice() {
      return store.meals.sort( (firstMeal, secondMeal) => {
        return firstMeal.price < secondMeal.price
      })
    }

    deliveries() {
      return store.deliveries.filter( delivery => {
        return delivery.mealId === this.id
      })
    }

    customers() {
      let customerIds = this.deliveries().map( delivery => {
        return delivery.customerId
      });

      return store.customers.filter( customer => {
        return customerIds.includes( customer.id )
      });
    }

  }
})(); // Meals

const Delivery = ( () => {
  let id = 0;

  return class Delivery {
    constructor(meal, customer) {
      this.id = ++id;
      if (meal) this.mealId = meal.id;
      if (customer) this.customerId = customer.id;
      store.deliveries.push(this);
    }

    meal(){
      return store.meals.find( meal => {
        return this.mealId === meal.id;
      })
    }

    customer(){
      return store.customers.find( customer => {
        return this.customerId === customer.id;
      })
    }

  }
})(); // Deliveries



const Employer = ( () => {
  let id = 0;

  return class Employer {
    constructor(name) {
      this.id = ++id;
      this.name = name;
      store.employers.push(this);
    }

    employees() {
      return store.customers.filter( customer => {
        return customer.employerId === this.id
      })
    }

    deliveries() {
      let employeeIds = this.employees().map( employee => {
        return employee.id
      });

      return store.deliveries.filter( delivery => {
        return employeeIds.includes(delivery.customerId)
      })
    }

    meals() {
      let allMeals = [];

      for (const customer of this.employees()) {
        for (const meal of customer.meals()) {
          if (!allMeals.includes(meal)) {
            allMeals.push(meal)
          }
        }
      }

      return allMeals
    }

    mealTotals() {
      const meals = {}; // key:mealId val:times ordered

      for (const customer of this.employees()) {
        for (const meal of customer.meals()) {
          if (meals[meal.id] === undefined) {
            meals[meal.id] = 1
          } else {
            meals[meal.id] += 1
          }
        }
      }

      return meals
    }

  }
})(); // Employers
