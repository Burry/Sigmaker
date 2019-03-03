const inputDefault = (placeholder = '', enabled = false, value = '') => ({
    placeholder,
    enabled,
    value
});

const checkboxDefault = value => inputDefault(value, value, value);

export default {
    salutation: {
        ...inputDefault('Best', true),
        options: [
            'Best',
            'Regards',
            'Best Regards',
            'Sincerely',
            'Warmly',
            'Thanks',
            'From',
            'Love',
            'Merry Christmas',
            "Don't contact me ever again"
        ]
    },
    firstName: inputDefault('Jon', true),
    lastName: inputDefault('Doe', true),
    email: inputDefault('jdoe@protonmail.com', true),
    phone: inputDefault('(555) 555-5555', true),
    dialCode: inputDefault('US', true, 'US'),
    site: inputDefault('https://jondoe.com', false),
    image: inputDefault('https://jondoe.com/avatar.png', true),
    imageSize: inputDefault(65, true, 65),
    borderRadius: inputDefault(4, true, 4),
    linkColor: inputDefault('#ff8700', false, undefined),
    showLine: checkboxDefault(true),
    facebook: inputDefault(''),
    twitter: inputDefault(''),
    instagram: inputDefault(''),
    linkedIn: inputDefault(''),
    pinterest: inputDefault(''),
    youTube: inputDefault(''),
    role: inputDefault('Chief Executive Dog Walker', true),
    company: inputDefault('Pyramid Scheme, Inc.', true),
    companySite: inputDefault('https://pyramids-r-us.com', true),
    companyFacebook: inputDefault(''),
    companyTwitter: inputDefault(''),
    companyInstagram: inputDefault(''),
    companyLinkedIn: inputDefault(''),
    companyPinterest: inputDefault(''),
    companyYouTube: inputDefault('')
};
