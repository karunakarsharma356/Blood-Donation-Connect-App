import {
  Droplets,
  MapPin,
  Phone,
  User,
  Trash2,
  Pencil,
} from "lucide-react";

function DonorCard({ donor, onDelete, onEdit }) {
  return (
    <div className="donor-card">

      <div className="donor-card-top">
        <div>
          <h2 className="donor-name">
            <User size={20} color="#dc2626" />
            {donor.name}
          </h2>
          <p className="donor-age">{donor.age} Years</p>
        </div>

        <span className="donor-blood-badge">{donor.bloodGroup}</span>
      </div>

      <div className="donor-details">
        <div className="donor-detail-row">
          <Phone size={18} color="#ef4444" />
          {donor.phone}
        </div>

        <div className="donor-detail-row">
          <MapPin size={18} color="#ef4444" />
          {donor.city}
        </div>

        <div className="donor-detail-row">
          <Droplets size={18} color="#ef4444" />
          <span className={donor.available ? "donor-available" : "donor-unavailable"}>
            {donor.available ? "Available" : "Not Available"}
          </span>
        </div>
      </div>

      <div className="donor-actions">
        <button onClick={() => onEdit(donor)} className="donor-btn donor-btn-edit">
          <Pencil size={18} />
          Edit
        </button>

        <button onClick={() => onDelete(donor._id)} className="donor-btn donor-btn-delete">
          <Trash2 size={18} />
          Delete
        </button>
      </div>

    </div>
  );
}

export default DonorCard;