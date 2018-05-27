module.exports = {
    "extends": "airbnb",
    "env": {
        "browser": true
    },
    "rules": {
      "no-console": "off",
      "no-underscore-dangle": "off",
      "jsx-a11y/label-has-for": "off",
      "jsx-a11y/anchor-is-valid": [ "error", {
        "specialLink": [ "hrefLeft", "hrefRight" ],
        "aspects": [ "noHref", "invalidHref", "preferButton" ]
      }]
    },
};