import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api/appointments";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // GET ALL APPOINTMENTS
  // =====================================================

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load appointments"
        );
      }

      setAppointments(data.appointments || []);
    } catch (error) {
      console.error(
        "Fetch appointments error:",
        error
      );

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD APPOINTMENTS
  // =====================================================

  useEffect(() => {
    fetchAppointments();
  }, []);

  // =====================================================
  // UPDATE STATUS
  // =====================================================

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `${API_URL}/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update status"
        );
      }

      // Update appointment immediately
      setAppointments((current) =>
        current.map((appointment) =>
          appointment._id === id
            ? {
                ...appointment,
                status:
                  data.appointment.status,
              }
            : appointment
        )
      );
    } catch (error) {
      console.error(
        "Update status error:",
        error
      );

      alert(error.message);
    }
  };

  // =====================================================
  // DELETE APPOINTMENT
  // =====================================================

  const deleteAppointment = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete appointment"
        );
      }

      setAppointments((current) =>
        current.filter(
          (appointment) =>
            appointment._id !== id
        )
      );
    } catch (error) {
      console.error(
        "Delete appointment error:",
        error
      );

      alert(error.message);
    }
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-blue-100 text-blue-700";

      case "Completed":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Appointments
            </h1>

            <p className="mt-2 text-gray-500">
              Loading appointments...
            </p>
          </div>

          <Link
            to="/admin/dashboard"
            className="rounded-lg bg-slate-800 px-5 py-3 font-semibold text-white transition hover:bg-slate-700"
          >
            ← Dashboard
          </Link>

        </div>

      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Appointments
          </h1>

          <p className="mt-2 text-gray-500">
            Manage customer appointment requests.
          </p>

        </div>

        <div className="flex gap-3">

          {/* DASHBOARD */}

          <Link
            to="/admin/dashboard"
            className="rounded-lg bg-slate-800 px-5 py-3 font-semibold text-white transition hover:bg-slate-700"
          >
            ← Dashboard
          </Link>

          {/* REFRESH */}

          <button
            onClick={fetchAppointments}
            className="rounded-lg bg-amber-600 px-5 py-3 font-semibold text-white transition hover:bg-amber-500"
          >
            Refresh
          </button>

        </div>

      </div>

      {/* ================================================= */}
      {/* ERROR */}
      {/* ================================================= */}

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* ================================================= */}
      {/* COUNT */}
      {/* ================================================= */}

      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

        <p className="text-sm text-gray-500">
          Total Appointments
        </p>

        <p className="mt-1 text-3xl font-bold text-slate-900">
          {appointments.length}
        </p>

      </div>

      {/* ================================================= */}
      {/* EMPTY */}
      {/* ================================================= */}

      {appointments.length === 0 ? (

        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">

          <p className="text-lg font-semibold text-gray-600">
            No appointments found
          </p>

          <p className="mt-2 text-sm text-gray-400">
            New appointment requests will appear here.
          </p>

        </div>

      ) : (

        /* ================================================= */
        /* TABLE */
        /* ================================================= */

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1100px]">

              {/* TABLE HEADER */}

              <thead className="bg-slate-100">

                <tr>

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    Phone
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    Product
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    Date
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    Time
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    Notes
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    Action
                  </th>

                </tr>

              </thead>

              {/* TABLE BODY */}

              <tbody className="divide-y divide-slate-200">

                {appointments.map(
                  (appointment) => (

                    <tr
                      key={appointment._id}
                      className="hover:bg-slate-50"
                    >

                      {/* CUSTOMER */}

                      <td className="px-5 py-5">

                        <p className="font-semibold text-slate-900">
                          {
                            appointment.customer
                              ?.fullName
                          }
                        </p>

                        {appointment.customer
                          ?.email && (

                          <p className="mt-1 text-xs text-gray-400">
                            {
                              appointment.customer
                                .email
                            }
                          </p>

                        )}

                      </td>

                      {/* PHONE */}

                      <td className="px-5 py-5 text-sm text-gray-600">

                        {
                          appointment.customer
                            ?.phone
                        }

                      </td>

                      {/* PRODUCT */}

                      <td className="px-5 py-5">

                        {appointment.productName ? (

                          <span className="font-medium text-amber-600">
                            {
                              appointment.productName
                            }
                          </span>

                        ) : (

                          <span className="text-gray-400">
                            —
                          </span>

                        )}

                      </td>

                      {/* DATE */}

                      <td className="px-5 py-5 text-sm text-gray-600">

                        {
                          appointment.appointment
                            ?.date
                        }

                      </td>

                      {/* TIME */}

                      <td className="px-5 py-5 text-sm text-gray-600">

                        {
                          appointment.appointment
                            ?.time
                        }

                      </td>

                      {/* NOTES */}

                      <td className="max-w-[220px] px-5 py-5 text-sm text-gray-600">

                        {appointment.appointment
                          ?.notes ? (

                          <span>
                            {
                              appointment
                                .appointment
                                .notes
                            }
                          </span>

                        ) : (

                          <span className="text-gray-400">
                            No notes
                          </span>

                        )}

                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-5">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                            appointment.status
                          )}`}
                        >
                          {appointment.status}
                        </span>

                      </td>

                      {/* ACTION */}

                      <td className="px-5 py-5">

                        <div className="flex flex-col gap-2">

                          {/* CHANGE STATUS */}

                          <select
                            value={
                              appointment.status
                            }
                            onChange={(e) =>
                              updateStatus(
                                appointment._id,
                                e.target.value
                              )
                            }
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500"
                          >

                            <option value="Pending">
                              Pending
                            </option>

                            <option value="Confirmed">
                              Confirmed
                            </option>

                            <option value="Completed">
                              Completed
                            </option>

                            <option value="Cancelled">
                              Cancelled
                            </option>

                          </select>

                          {/* DELETE */}

                          <button
                            onClick={() =>
                              deleteAppointment(
                                appointment._id
                              )
                            }
                            className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  );
}

export default Appointments;