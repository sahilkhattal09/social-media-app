import React from "react";

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
}) => {
  const getStrength = (password: string) => {
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    let score = 0;
    if (hasSpecialChar) score++;
    if (hasUpperCase) score++;
    if (hasLowerCase) score++;
    if (hasNumber) score++;

    return score;
  };

  const strength = getStrength(password);

  const getStrengthClass = () => {
    if (strength === 0) return "bg-red-500"; // Very Weak - Red
    if (strength === 1) return "bg-yellow-500"; // Weak - Yellow
    if (strength === 2) return "bg-orange-400"; // Medium - Slight Orange
    if (strength === 3) return "bg-orange-500"; // Almost Strong - Deeper Orange
    return "bg-green-500"; // Strong - Green (all conditions met)
  };

  return (
    <div className="mt-2">
      <div className="w-full bg-gray-200 rounded-full">
        <div
          className={`h-2 rounded-full ${getStrengthClass()} transition-all`}
          style={{ width: `${(strength / 4) * 100}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Password Strength:{" "}
        {["Very Weak", "Weak", "Medium", "Almost Strong", "Strong"][strength]}
      </p>
    </div>
  );
};

export default PasswordStrengthMeter;
