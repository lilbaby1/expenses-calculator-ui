// Function that checks the every "roommate" object to see if all the inputs from the user are valid
const checkMateInput = (mates) => {
  let error;
  for (let i = 0; i < mates.length; i++) {
    if (mates[i].amountPaid === "..." || mates[i].amountPaid < 0) {
      error = "Invalid input for amount paid by roommate.";
      break;
    }
    if (
      mates[i].individualExpenses === "..." ||
      mates[i].individualExpenses < 0
    ) {
      error = "Invalid input for individual expense made by roommate.";
      break;
    }
    if (mates[i].jointExpenses === "..." || mates[i].jointExpenses < 0) {
      error = "Invalid input for a joint expense between roommates.";
      break;
    }
  }
  if (error) return { error: error };
  return false;
};

// Function that checks if the joint expenses between different roommates are valid.
const checkJoinExpensesInput = (jointExpenses) => {
  let error;
  jointExpenses.forEach((expense) =>
    typeof expense[1] !== "number"
      ? (error = "Invalid input for a joint expense between roommates.")
      : null
  );
  if (error) return { error: error };
  return false;
};

// This function calculates the expenses of each roommate regardless of the amount of roommates
export const calculateExpenses = (matesArr, jointExpensesArr) => {
  let result;

  // Check if every roommate input value is valid.
  result = checkMateInput(matesArr);
  if (result?.error) {
    console.log(result.error);
    return result;
  }
  //Check if jointExpensesArr is defined.
  if (jointExpensesArr) {
    // jointExpensesArr is defined. Check if every joint expense input value is valid.
    result = checkJoinExpensesInput(jointExpensesArr);
    if (result?.error) {
      console.log(result.error);
      return result;
    } else {
      // Every joint expense input value is valid. The jointExpenses value of each mate is being reset to 0
      // in order to avoid errors if the user re-calculates the expenses.
      matesArr.forEach((mate) => (mate.jointExpenses = 0));
    }

    // Loop through the jointExpensesArr and add joint expenses to every roommate which has at least one
    jointExpensesArr.forEach((expense) => {
      // divisionNumber is used to determine how to split the expense (i.e. between 2 or 3 mates)
      const divisionNumber = expense[0].length;
      expense[0].forEach((mateIndex) => {
        matesArr[mateIndex].jointExpenses += expense[1] / divisionNumber;
      });
    });
  }

  // Sum of all the expenses of every roommate
  let totalExpenses = 0;
  matesArr.forEach((mate) => {
    totalExpenses += mate.amountPaid;
    console.log(totalExpenses);
  });

  // Sum of all shared expenses between the roommates
  let sharedExpenses = totalExpenses;
  matesArr.forEach((mate) => {
    console.log(mate.jointExpenses);
    sharedExpenses -= mate.individualExpenses + mate.jointExpenses;
  });

  if (sharedExpenses < 0) {
    return {
      error:
        "Invalid input - individual expenses exceed the total amount paid.",
    };
  }

  // Sum of the expenses of each mate
  let divisionNumber = matesArr.length;
  let individualExpenses = [];
  let messages = [];

  matesArr.forEach((mate, i) => {
    individualExpenses.push(
      parseFloat(
        sharedExpenses / divisionNumber +
          mate.individualExpenses +
          mate.jointExpenses
      ).toFixed(2)
    );
    const message =
      individualExpenses[i] < mate.amountPaid
        ? `has to recieve ${parseFloat(
            (mate.amountPaid - individualExpenses[i]).toFixed(2)
          )}`
        : `has to pay ${parseFloat(
            (individualExpenses[i] - mate.amountPaid).toFixed(2)
          )}`;
    messages.push(message);
  });

  return {
    // totalExpenses : parseFloat(totalExpenses.toFixed(2)),
    totalExpenses,
    sharedExpenses: parseFloat(sharedExpenses.toFixed(2)),
    individualExpenses,
    messages,
  };
};
