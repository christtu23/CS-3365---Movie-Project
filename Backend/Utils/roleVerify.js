/**
 * Fetches Role from the Header & Verifies access
 * @param {string} requiredRole 
 * @returns 
 */


const roleCheck = (requiredRole) => {
    return (req, res, next) => {
        const userRole = req.header('role'); // Example: Get role from header
        if (userRole !== requiredRole) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
 };
 
 module.exports = roleCheck;