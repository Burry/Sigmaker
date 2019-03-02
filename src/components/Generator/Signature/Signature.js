import React, { useState, useEffect } from 'react';
import { shape, string, oneOfType, node, arrayOf } from 'prop-types';
import PhoneNumber from 'awesome-phonenumber';
import gravatar from 'gravatar';

const phoneUri = value =>
    new PhoneNumber(value, 'US').getNumber('rfc3966') || `tel:${value}`;

const lineHeight = 1.5;

const Signature = ({ inputs }) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        site,
        salutation,
        image: _image,
        imageSize: maxImageSize,
        borderRadius,
        linkColor,
        showLine,
        role,
        company,
        companySite
    } = Object.keys(inputs).reduce((acc, key) => {
        const { enabled, value, placeholder } = inputs[key];
        if (enabled)
            acc[key] =
                value === '' || typeof value === 'undefined'
                    ? placeholder
                    : value;
        return acc;
    }, {});

    const [imageSize, setImageSize] = useState({
        width: maxImageSize,
        height: maxImageSize
    });

    const image =
        _image === 'https://jondoe.com/avatar.png' || _image === ''
            ? gravatar.url(email, { size: 300, default: 'retro' })
            : _image;

    const adjustedImageSize = ({ width, height }) => {
        const ratioX = maxImageSize / width;
        const ratioY = maxImageSize / height;
        const ratio = Math.min(ratioX, ratioY);
        const newWidth = ratio * width;
        const newHeight = ratio * height;
        return { width: newWidth, height: newHeight };
    };

    const SignatureImage = () => (
        <img
            src={image}
            width={imageSize.width}
            height={imageSize.height}
            alt={`${firstName} ${lastName}`}
            style={{
                boxSizing: 'border-box',
                borderStyle: 'none',
                borderRadius: `${borderRadius}px`,
                ...imageSize
            }}
        />
    );

    useEffect(() => {
        const img = new Image();
        img.src = image;
        img.onload = () => setImageSize(adjustedImageSize(img));
    }, [image]);

    const Link = ({ children, href, style, ...props }) => (
        <a
            href={href}
            style={{
                color: linkColor || '#0000ee',
                textDecoration: 'underline',
                lineHeight,
                ...style
            }}
            {...props}
        >
            {children}
        </a>
    );

    Link.propTypes = {
        children: oneOfType([node, arrayOf(node)]).isRequired,
        href: string.isRequired,
        style: shape({})
    };

    Link.defaultProps = {
        style: {}
    };

    return (
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title />
            </head>
            <body
                style={{
                    wordWrap: 'break-word',
                    WebkitNbspMode: 'space',
                    lineBreak: 'after-white-space'
                }}
            >
                {salutation},
                <br />
                {firstName}
                {showLine && (
                    <hr
                        style={{
                            boxSizing: 'content-box',
                            height: 0,
                            overflow: 'visible',
                            margin: '1.5rem auto',
                            border: 0,
                            borderTop: '1px solid rgba(0,0,0,0.1)',
                            display: 'block',
                            marginInlineStart: 'auto',
                            marginInlineEnd: 'auto'
                        }}
                    />
                )}
                <table
                    border={0}
                    cellPadding={0}
                    cellSpacing={0}
                    style={{
                        width: '100%',
                        ...(showLine ? {} : { margin: '1.5rem auto' })
                    }}
                >
                    <tbody>
                        <tr>
                            {image && (
                                <td style={{ width: imageSize.width }}>
                                    {site ? (
                                        <a href={site}>
                                            <SignatureImage />
                                        </a>
                                    ) : (
                                        <SignatureImage />
                                    )}
                                </td>
                            )}
                            <td style={image && { paddingLeft: 15 }}>
                                <b
                                    style={{
                                        fontWeight: 'bolder',
                                        lineHeight
                                    }}
                                >
                                    {firstName} {lastName}
                                </b>
                                {role && (
                                    <>
                                        <br />
                                        <span style={{ lineHeight }}>
                                            {role}
                                        </span>
                                    </>
                                )}
                                {company && (
                                    <>
                                        {!role && <br />}
                                        <span style={{ lineHeight }}>
                                            {role && <> at </>}
                                            {companySite ? (
                                                <Link href={companySite}>
                                                    {company}
                                                </Link>
                                            ) : (
                                                company
                                            )}
                                        </span>
                                    </>
                                )}
                                {site && (
                                    <>
                                        <br />
                                        <span style={{ lineHeight }}>
                                            <Link href={site}>{site}</Link>
                                        </span>
                                    </>
                                )}
                                {(phone || email) && (
                                    <>
                                        <br />
                                        {email && (
                                            <Link
                                                href={`mailto:${email}`}
                                                style={{
                                                    fontSize: '80%'
                                                }}
                                            >
                                                {email}
                                            </Link>
                                        )}
                                        {email && phone && (
                                            <>
                                                {' '}
                                                <span
                                                    style={{
                                                        fontSize: '80%',
                                                        color: 'rgba(0,0,0,0.1)'
                                                    }}
                                                >
                                                    |
                                                </span>{' '}
                                            </>
                                        )}
                                        {phone && (
                                            <Link
                                                href={phoneUri(phone)}
                                                style={{
                                                    fontSize: '80%'
                                                }}
                                            >
                                                {phone}
                                            </Link>
                                        )}
                                    </>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </body>
        </html>
    );
};

Signature.propTypes = {
    inputs: shape({}).isRequired
};

export default Signature;

export const signatureHeaderAndDoctype =
    '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
