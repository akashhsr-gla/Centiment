export const validEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};
export const valiPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
};
export const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    let initials = "";
    
    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0]; 
    }
    
    return initials.toUpperCase();
};
export const addThousandsSeparator = (num) => {
    return num.toLocaleString('en-IN');  // Uses Indian numbering format
  };
